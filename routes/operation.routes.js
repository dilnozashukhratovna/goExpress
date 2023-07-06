const { Router } = require("express");
const {
    addOperation,
    getOperations,
    getOperationById,
    updateOperation,
    deleteOperation,
} = require("../controllers/operation.controller");
const router = Router();

router.post("/", addOperation);
router.get("/", getOperations);
router.get("/:id", getOperationById);
router.put("/:id", updateOperation);
router.delete("/:id", deleteOperation);

module.exports = router;
