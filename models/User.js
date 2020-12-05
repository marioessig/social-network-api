const { Schema, model, Types } = require("mongoose");

// set up user schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email required"],
      validate: {
        validator(validEmail) {
          return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})(\.[a-z]{2,6})?$/.test(
            validEmail
          );
        },
        message: "Please enter a valid email",
      },
        },
    // pass thoughts data
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
        ],
    // pass friends data
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// get total count of friends
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create the User model with UserSchema
const User = model("User", UserSchema);

module.exports = User;