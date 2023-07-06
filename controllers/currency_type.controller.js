const pool = require("../config/db");
const {currencyTypeValidation} = require("../validations/currency_type.validation");

const addCurrency_type = async (req, res) => {
    try {
        const { error, value } = currencyTypeValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { name, description } = value;

        const newCurrency_type = await pool.query(
            `
        INSERT INTO currency_type (name, description)
        values($1, $2) RETURNING *
        `,
            [name, description]
        );
        console.log(newCurrency_type);
        res.status(200).json(newCurrency_type.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
        console.log(error);
    }
};

const getCurrency_typeById = async (req, res) => {
    try {
        const id = req.params.id;
        const currency_type = await pool.query(
            `SELECT * FROM currency_type WHERE id = $1`,
            [id]
        );
        if (currency_type.rows.length === 0) {
            return res.status(400).json("There is no currency type with such Id");
        }
        res.status(200).json(currency_type.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
        console.log(error);
    }
};

const getCurrency_types = async (req, res) => {
    try {
        const currency_type = await pool.query(`SELECT * FROM currency_type`);
        res.status(200).send(currency_type.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
    }
};

const deleteCurrency_type = async (req, res) => {
    try {
        const id = req.params.id;
        const currency_type = await pool.query(
            `DELETE FROM currency_type WHERE id = $1`,
            [id]
        );
        if (currency_type.rowCount === 0) {
            return res.status(400).json("There is no currency type with such Id");
        }
        res.status(200).json("Successfully deleted");
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
    }
};

const updateCurrency_type = async (req, res) => {
    try {
        const id = req.params.id;
         const { error, value } = currencyTypeValidation(req.body);
         if (error) {
             return res.status(400).send(error.details[0].message);
         }
        const { name, description } = value;

        const currency_type = await pool.query(
            `
        UPDATE currency_type set name = $1, description = $2
        WHERE id = $3
            RETURNING *
        `,
            [name, description, id]
        );
        if (currency_type.rows.length === 0) {
            return res.status(400).json("There is no currency type with such Id");
        }
        res.status(200).json(currency_type.rows);
    } catch (error) {
        res.status(500).json(`Server Error: ${error.message}`);
        console.log(error);
    }
};

module.exports = {
    getCurrency_typeById,
    addCurrency_type,
    getCurrency_types,
    updateCurrency_type,
    deleteCurrency_type,
};
