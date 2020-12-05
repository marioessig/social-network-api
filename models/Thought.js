const { Schema, model, Types } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema(
  {
    // set custom ID to deifferinate from parent thought ID
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // Moment.js to format date
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    // use getters
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 280,
    },
    // Moment.js to format date
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    // relate reactions to thoughts
    reactions: [ReactionSchema],
  },
  {
    // use virtuals and getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//get total count of reactions
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// create the Thought model with ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
