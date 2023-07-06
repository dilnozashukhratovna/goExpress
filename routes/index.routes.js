const { Router } = require("express");
const router = Router();

const adminRouter = require("./admin.routes");
const orderRouter = require("./order.routes");
const operationRouter = require("./operation.routes");
const statusRouter = require("./status.routes");
const currency_typeRouter = require("./currency_type.routes");

router.use("/admin", adminRouter);
router.use("/order", orderRouter);
router.use("/operation", operationRouter);
router.use("/status", statusRouter);
router.use("/currency", currency_typeRouter);


module.exports = router;
