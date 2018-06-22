const router = require("express").Router();
const noteController = require("../../controllers/note");

router.get("/:id", noteController.findOne);
router.post("/", noteController.create);
router.delete("/:id", noteController.delete);

module.exports = router;