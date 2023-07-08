const { Router } = require("express");
const {
    addAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    loginAdmin,
    logoutAdmin,
} = require("../controllers/admin.controller");

const adminPolice = require("../middleware/adminPolice");
const creatorPolice = require("../middleware/creatorPolice");

const router = Router();

router.post("/", creatorPolice, addAdmin);
router.get("/", creatorPolice, getAdmins);
router.get("/:id", creatorPolice, getAdminById);
router.put("/:id", adminPolice, updateAdmin);
router.delete("/:id", creatorPolice, deleteAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);


module.exports = router;
