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

router.post("/", creatorPolice, addOrder);
router.get("/", adminPolice, getOrders);
router.get("/:id", adminPolice, getOrderById);
router.put("/:id", creatorPolice, updateOrder);
router.delete("/:id", creatorPolice, deleteOrder);

module.exports = router;
