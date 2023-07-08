const { Router } = require("express");
const {
    addStatus,
    getStatuses,
    getStatusById,
    updateStatus,
    deleteStatus,
} = require("../controllers/status.controller");

const router = Router();
const adminPolice = require("../middleware/adminPolice");
const creatorPolice = require("../middleware/creatorPolice");

router.post("/", creatorPolice, addStatus);
router.get("/", adminPolice, getStatuses);
router.get("/:id", adminPolice, getStatusById);
router.put("/:id", creatorPolice, updateStatus);
router.delete("/:id", creatorPolice, deleteStatus);

module.exports = router;
