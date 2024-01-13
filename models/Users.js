const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
      },
  ],
    friends: [
      {
      type: Schema.Types.ObjectId,
      ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
