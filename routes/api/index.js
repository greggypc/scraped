var router = require("express").Router();
var fetchRoutes = require("./fetch");
var noteRoutes = require("./notes");
var headlineRoutes = require("./headlines");

router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/headlines", headlineRoutes);

module.exports = router;