const { Router } = require("express");
const {
    addOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require("../controllers/order.controller");

const router = Router();

router.post("/", addOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;

