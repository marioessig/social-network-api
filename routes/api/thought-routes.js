const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// set /api/thoughts (GET and POST)
router.route("/")
  .get(getAllThoughts)
  .post(createThought);

// set /api/thoughts/<userId> (route, GET, PUT and DELETE)
router.route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// set reaction routes (routes, POST and DELETE)
router.route("/:id/reactions")
  .post(addReaction);
router.route("/:id/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;
