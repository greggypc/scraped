//routes - index
const router = require("express").Router();
const apiRoutes = require("./api");
const viewRoutes = require("./view");

router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;