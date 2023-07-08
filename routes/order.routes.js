const { Router } = require("express");
const {
    addOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require("../controllers/order.controller");

const router = Router();
const adminPolice = require("../middleware/adminPolice");
const creatorPolice = require("../middleware/creatorPolice");

router.post("/", adminPolice, addOrder);
router.get("/", adminPolice, getOrders);
router.get("/:id", adminPolice, getOrderById);
router.put("/:id", adminPolice, updateOrder);
router.delete("/:id", adminPolice, deleteOrder);

module.exports = router;
