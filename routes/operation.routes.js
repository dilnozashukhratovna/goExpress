const { Router } = require("express");
const {
    addOperation,
    getOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
} = require("../controllers/operation.controller");
const router = Router();

const adminPolice = require("../middleware/adminPolice");
const creatorPolice = require("../middleware/creatorPolice");

router.post("/", adminPolice, addOperation);
router.get("/", adminPolice, getOperations);
router.get("/:id", adminPolice, getOperationById);
router.put("/:id", adminPolice, updateOperation);
router.delete("/:id", adminPolice, deleteOperation);

module.exports = router;
