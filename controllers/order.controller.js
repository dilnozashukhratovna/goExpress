const pool = require("../config/db");
const uuid = require("uuid");
const { orderValidation } = require("../validations/order.validation");
const { errorHandler } = require("../helpers/error_handler");


const addOrder = async (req, res) => {
    try {
        const { error, value } = orderValidation(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const {
            full_name,
            phone_number,
            product_link,
            summa,
            currency_type_id,
            truck,
            email,
            description,
        } = value;

        const newOrder = await pool.query(
            `
        INSERT INTO orderr (order_unique_id, full_name, phone_number, 
            product_link, summa, currency_type_id, truck, email, description)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `,
            [
                uuid.v4(),
                full_name,
                phone_number,
                product_link,
                summa,
                currency_type_id,
                truck,
                email,
                description,
            ]
        );
        console.log(newOrder);
        res.status(200).json(newOrder.rows);
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await pool.query(`SELECT * FROM orderr WHERE id = $1`, [
            id,
        ]);
        if (order.rows.length === 0) {
            return res.status(400).json("There is no order with such Id");
        }
        res.status(200).json(order.rows);
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const getOrders = async (req, res) => {
    try {
        const order = await pool.query(`SELECT * FROM orderr`);
        res.status(200).send(order.rows);
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await pool.query(`DELETE FROM orderr WHERE id = $1`, [
            id,
        ]);
        if (order.rowCount === 0) {
            return res.status(400).json("There is no order with such Id");
        }
        res.status(200).json("Successfully deleted");
    } catch (error) {
        errorHandler(res, error);
    }
};

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const { error, value } = orderValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const {
            full_name,
            phone_number,
            product_link,
            summa,
            currency_type_id,
            truck,
            email,
            description,
        } = value;

        const updateQuery = `
            UPDATE orderr
            SET full_name = $1, phone_number = $2, product_link = $3, summa = $4,
            currency_type_id = $5, truck = $6, email = $7, description = $8
            WHERE id = $9
            RETURNING *
        `;
        const updatedOrder = await pool.query(updateQuery, [
            full_name,
            phone_number,
            product_link,
            summa,
            currency_type_id,
            truck,
            email,
            description,
            id,
        ]);
        if (updatedOrder.rows.length === 0) {
            return res.status(400).json("There is no order with such Id");
        }
        res.status(200).json(updatedOrder.rows);
    } catch (error) {
        errorHandler(res, error);
        console.log(error);
    }
};


module.exports = {
    getOrderById,
    addOrder,
    getOrders,
    updateOrder,
    deleteOrder,
};
