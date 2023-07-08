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

router.post("/", creatorPolice, addOperation);
router.get("/", adminPolice, getOperations);
router.get("/:id", adminPolice, getOperationById);
router.put("/:id", creatorPolice, updateOperation);
router.delete("/:id", creatorPolice, deleteOperation);

module.exports = router;
