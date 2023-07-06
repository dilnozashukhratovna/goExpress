const { Router } = require("express");
const {
  addCurrency_type,
  getCurrency_types,
  getCurrency_typeById,
  updateCurrency_type,
  deleteCurrency_type,
} = require("../controllers/currency_type.controller");

const router = Router();

router.post("/", addCurrency_type);
router.get("/", getCurrency_types);
router.get("/:id", getCurrency_typeById);
router.put("/:id", updateCurrency_type);
router.delete("/:id", deleteCurrency_type);

module.exports = router;