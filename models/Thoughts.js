const { Schema, model } = require("mongoose");
const ReactionSchema = require("./Reactions");
// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      },
    },

    username: [
      {
        type: String,
        required: true,
      },
    ],
    reactions: [ReactionSchema]
    // [
    //   {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //   },
    // ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });
const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
