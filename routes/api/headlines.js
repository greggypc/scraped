const router = require("express").Router();
const headlineController = require("../../controllers/headline");

router.get("/", headlineController.findAll);
router.delete("/:id", headlineController.delete);
router.put("/:id", headlineController.update);

module.exports = router;