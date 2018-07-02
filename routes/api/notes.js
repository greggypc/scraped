const router = require("express").Router();
const noteController = require("../../controllers/note");

router.get("/:id", noteController.findAll);
router.delete("/:id", noteController.delete);

module.exports = router;