const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// set /api/users (route, GET and POST)
router.route("/")
    .get(getAllUsers)
    .post(createUser);

// set /api/users/:id (route, GET, PUT and DELETE)
router.route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// set /api/:id/friends/:friendId (route, POST and DELETE)
router.route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;
