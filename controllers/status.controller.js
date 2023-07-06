const pool = require("../config/db");
const {statusValidation} = require("../validations/status.validation");

const addStatus = async (req, res) => {
    try {
        const { error, value } = statusValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { name, description } = value;

        const newStatus = await pool.query(
            `
        INSERT INTO status (name, description)
        values($1, $2) RETURNING *
        `,
            [name, description]
        );
        console.log(newStatus);
        res.status(200).json(newStatus.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
        console.log(error);
    }
};

const getStatusById = async (req, res) => {
    try {
        const id = req.params.id;
        const status = await pool.query(`SELECT * FROM status WHERE id = $1`, [
            id,
        ]);
        if (status.rows.length === 0) {
            return res.status(400).json("There is no status with such Id");
        }
        res.status(200).json(status.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
        console.log(error);
    }
};

const getStatuses = async (req, res) => {
    try {
        const status = await pool.query(`SELECT * FROM status`);
        res.status(200).send(status.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
    }
};

const deleteStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = await pool.query(`DELETE FROM status WHERE id = $1`, [
            id,
        ]);
        if (status.rowCount === 0) {
            return res.status(400).json("There is no status with such Id");
        }
        res.status(200).json("Successfully deleted");
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
    }
};

const updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { error, value } = statusValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { name, description } = value;
        const status = await pool.query(
            `
        UPDATE status set name = $1, description = $2
        WHERE id = $3
            RETURNING *
        `,
            [name, description, id]
        );
        if (status.rows.length === 0) {
            return res.status(400).json("There is no status with such Id");
        }
        res.status(200).json(status.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
        console.log(error);
    }
};

module.exports = {
    getStatusById,
    addStatus,
    getStatuses,
    updateStatus,
    deleteStatus,
};
