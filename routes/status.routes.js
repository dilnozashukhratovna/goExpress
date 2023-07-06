const { Router } = require("express");
const {
    addStatus,
    getStatuses,
    getStatusById,
    updateStatus,
    deleteStatus,
} = require("../controllers/status.controller");

const router = Router();

router.post("/", addStatus);
router.get("/", getStatuses);
router.get("/:id", getStatusById);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;
