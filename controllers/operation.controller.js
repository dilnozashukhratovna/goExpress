const pool = require("../config/db");
const { operationValidation } = require("../validations/operation.validation");
const { errorHandler } = require("../helpers/error_handler");


const addOperation = async (req, res) => {
    try {
        const { error, value } = operationValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { order_id, status_id, admin_id, description } = value;

        const newOperation = await pool.query(
            `INSERT INTO operation (order_id, status_id, admin_id, description) 
      VALUES ($1, $2, $3, $4) RETURNING *`,
            [order_id, status_id, admin_id, description]
        );

        console.log(newOperation.rows);
        res.status(200).json(newOperation.rows);
    } catch (error) {
        console.log(error);
        errorHandler(res, error);
    }
};

const getOperations = async (req, res) => {
    try {
        const operations = await pool.query(`SELECT * FROM operation`);
        res.status(200).send(operations.rows);
    } catch (error) {
        errorHandler(res, error);
    }
};

const getOperationById = async (req, res) => {
    try {
        const id = req.params.id;
        const operation = await pool.query(
            `SELECT * FROM operation WHERE id=$1`,
            [id]
        );
        if (operation.rows.length === 0) {
            return res.status(400).json("There is no operation with such Id");
        }
        res.status(200).send(operation.rows);
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateOperation = async (req, res) => {
    try {
        const id = req.params.id;
        const { error, value } = operationValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { order_id, status_id, operation_date, admin_id, description } =
            value;

        const operation = await pool.query(
            `
                UPDATE operation SET order_id=$1, status_id=$2, operation_date=$3, 
                admin_id=$4, description=$5
                WHERE id=$6 RETURNING *
            `,
            [order_id, status_id, operation_date, admin_id, description, id]
        );
        console.log(operation);
        if (operation.rows.length === 0) {
            return res.status(400).json("There is no operation with such Id");
        }
        res.status(200).json(operation.rows);
    } catch (error) {
        errorHandler(res, error);
    }
};

const deleteOperation = async (req, res) => {
    try {
        const id = req.params.id;
        const operation = await pool.query(
            `DELETE FROM operation WHERE id = $1;`,
            [id]
        );
        if (operation.rowCount === 0) {
            return res.status(400).json("There is no operation with such Id");
        }
        res.status(200).send({ message: "Successfully deleted!" });
    } catch (error) {
        errorHandler(res, error);
    }
};

module.exports = {
    addOperation,
    getOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
};
