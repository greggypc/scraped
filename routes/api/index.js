const router = require("express").Router();
const fetchRoutes = require("./fetch");
const noteRoutes = require("./notes");
const headlineRoutes = require("./headlines");

router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/headlines", headlineRoutes);

module.exports = router;