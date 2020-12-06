const { User, Thought } = require("../models");

const userController = {
  // get all users @ /api/users (GET)
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        // Ignore the __v
        select: "-__v",
      })
      .select("-__v")
      // newest user returns first by sorting (-1, DESC order by id value)
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get a user by id @ /api/users/id (GET)
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a user @ /api/users (POST)
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // update a User by ID @/api/users/id (PUT)
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete user by ID @ /api/users/id (DELETE)
  deleteUser({ params }, res) {
    // delete the user
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // remove the user from friends array
        User.updateMany(
          //look for id in friends array and remove the user
          { _id: { $in: dbUserData.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            // remove any thoughts related to this user
            Thought.deleteMany({ username: dbUserData.username })
              .then(() => {
                res.json({ message: "Successfully deleted user" });
              })
              .catch((err) => res.status(400).json(err));
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // add a Friend @ /api/users/:userId/friends/:friendId (POST)
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      // add to set to prevent duplicates friend IDs from being added
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // remove a Friend @ /api/users/:userId/friends/:friendId (DELETE)
  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No friend found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
