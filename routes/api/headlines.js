var router = require("express").Router();
var headlineController = require("../../controllers/headline");

router.get("/", headlineController.findAll);
router.get("/:id", headlineController.findOne);
router.post("/:id", headlineController.create);
router.delete("/:id", headlineController.delete);
router.put("/:id", headlineController.update);

module.exports = router;