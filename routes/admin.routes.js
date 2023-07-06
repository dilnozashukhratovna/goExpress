const { Router } = require("express");
const {
    addAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
} = require("../controllers/admin.controller");
const router = Router();

router.post("/", addAdmin);
router.get("/", getAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/login", loginAdmin);

module.exports = router;
