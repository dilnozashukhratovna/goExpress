const pool = require("../config/db");
const myJwt = require("../services/JwtService");
const bcrypt = require("bcrypt");
const config = require("config");
const { adminValidation } = require("../validations/admin.validation");
const { errorHandler } = require("../helpers/error_handler");

const addAdmin = async (req, res) => {
    try {
        const { error, value } = adminValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const {
            full_name,
            user_name,
            hashed_password,
            phone_number,
            email,
            tg_link,
            is_creator,
            is_active,
            description,
        } = value;

        const adminExists = await pool.query(
            "SELECT * FROM admin WHERE email = $1",
            [email]
        );

        if (adminExists.rows.length > 0) {
            return res
                .status(409)
                .json({ message: "Admin with this email already exists" });
        }

        const adminRoles = is_creator
            ? ["READ", "UPDATE", "DELETE", "WRITE"]
            : ["READ", "UPDATE"];

        const payload = {
            id: req.params.id,
            is_creator: is_creator,
            adminRoles: adminRoles,
            is_active: is_active,
        };

        const tokens = myJwt.generateTokens(payload);
        const hashedPassword = await bcrypt.hash(hashed_password, 7);
        const hashedToken = bcrypt.hashSync(tokens.refreshToken, 7);

        const newAdmin = await pool.query(
            `
            INSERT INTO admin (full_name, user_name, hashed_password, phone_number, email, tg_link, hashed_token, is_creator, is_active, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `,
            [
                full_name,
                user_name,
                hashedPassword,
                phone_number,
                email,
                tg_link,
                hashedToken,
                is_creator,
                is_active,
                description,
            ]
        );

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.status(200).json(newAdmin.rows);
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, hashed_password } = req.body;
        const admin = await pool.query(
            `
        SELECT * FROM admin WHERE email = $1;
      `,
            [email]
        );
        console.log(admin.rows[0]);
        if (!admin.rows[0])
            return res
                .status(400)
                .send({ message: "Email or password is incorrect" });

        const hashedPassword = admin.rows[0].hashed_password;
        if (!bcrypt.compareSync(hashed_password, hashedPassword))
            return res
                .status(400)
                .send({ message: "Email or password is incorrect" });

        const id = admin.rows[0].id;
        console.log(id);
        const is_creator = admin.rows[0].is_creator;
        console.log(is_creator);
        const is_active = admin.rows[0].is_active;
        console.log(is_active);

        const adminRoles = is_creator
            ? ["READ", "UPDATE", "DELETE", "WRITE"]
            : ["READ", "UPDATE"];
        const payload = {
            is_creator: is_creator,
            adminRoles: adminRoles,
            is_active: is_active,
        };

        const tokens = myJwt.generateTokens(payload);
        console.log(tokens);

        admin.rows[0].hashed_token = tokens.refreshToken;

        res.cookie("refreshToken", tokens.refreshToken, {
            maxAge: config.get("refresh_ms"),
            httpOnly: true,
        });

        res.status(200).send({ ...tokens });
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const getAdminById = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await pool.query(`SELECT * FROM admin WHERE id = $1`, [
            id,
        ]);
        if (admin.rows.length === 0) {
            return res.status(400).json("There is no admin with such Id");
        }
        res.status(200).json(admin.rows);
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const getAdmins = async (req, res) => {
    try {
        const admin = await pool.query(`SELECT * FROM admin`);
        res.status(200).send(admin.rows);
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await pool.query(`DELETE FROM admin WHERE id = $1`, [id]);
        if (admin.rowCount === 0) {
            return res.status(400).json("There is no admin with such Id");
        }
        res.status(200).json("Successfully deleted");
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const { error, value } = adminValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const {
            full_name,
            user_name,
            phone_number,
            email,
            tg_link,
            description,
        } = value;

        const payload = {
            email: email,
            tg_link: tg_link,
        };

        const tokens = myJwt.generateTokens(payload);
        const hashed_token = bcrypt.hashSync(tokens.refreshToken, 7);

        const newAdmin = await pool.query(
            `
        UPDATE admin set full_name = $1, user_name = $2, phone_number = $3, email = $4,
        tg_link = $5, description = $6, hashed_token = $7
        WHERE id = $8
            RETURNING *
        `,
            [
                full_name,
                user_name,
                phone_number,
                email,
                tg_link,
                description,
                hashed_token,
                id,
            ]
        );
        if (updatedOrder.rows.length === 0) {
            return res.status(400).json("There is no admin with such Id");
        }
        res.status(200).json("Admin is successfully updated");
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const logoutAdmin = async (req, res) => {
    const { refreshToken } = req.cookies;
    let admin;

    if (!refreshToken)
        return res.status(400).send({ message: "Token is not found" });

    try {
        const queryResult = await pool.query(
            `
            UPDATE admin
            SET hashed_token = ''
            WHERE hashed_token = $1
            RETURNING *
        `,
            [refreshToken]
        );

        if (queryResult.rowCount === 0)
            return res.status(400).send({ message: "Token is not found" });

        admin = queryResult.rows[0];

        res.clearCookie("refreshToken");
        return res.status(200).send({ admin });
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

module.exports = {
    getAdminById,
    addAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    logoutAdmin,
};
