const { Router } = require("express");
const {
    addCurrency_type,
    getCurrency_types,
    getCurrency_typeById,
    updateCurrency_type,
    deleteCurrency_type,
} = require("../controllers/currency_type.controller");

const router = Router();

const adminPolice = require("../middleware/adminPolice");
const creatorPolice = require("../middleware/creatorPolice");

router.post("/", creatorPolice, addCurrency_type);
router.get("/", adminPolice, getCurrency_types);
router.get("/:id", adminPolice, getCurrency_typeById);
router.put("/:id", creatorPolice, updateCurrency_type);
router.delete("/:id", creatorPolice, deleteCurrency_type);

module.exports = router;
