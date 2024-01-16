const { Users } = require('../models');

const usersController = {
  getUsers(req,res) {
    Users.find()
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err));
  },

getSingleUser(req,res) {
  Users.findById(req.params.userId)
  .then(userData => res.json(userData))
  .catch(err => res.status(500).json(err));
},

createUser(req,res) {
  Users.create(req.body)
  .then(userData => res.json(userData))
  .catch(err => res.status(500).json(err))
},

async updateUser(req, res) {
  try {
    const userData = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!userData) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
},

async deleteSingleUser(req, res) {
  try {
    const userData = await Users.findOneAndDelete({ _id: req.params.userId });

    if (!userData) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    await Users.deleteMany({ _id: { $in: userData.students } });
    res.json({ message: 'User deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},

async addFriend(req,res) {
  try {
    const user = await Users.findOneAndUpdate(
      { 
        _id: req.params.id,
        friends: { $ne: req.params.friendId },
      }, 
      { $push : { friends: req.params.friendId }},
      { 
        new: true,
        unique: true,
      }
    )
    res.json({message: 'Your user now has a friend!'});

  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Unable to add friend to this user.'});
  }

},

async removeFriend(req, res) {
  try {
    const user = await Users.findOneAndUpdate(
      { 
        _id: req.params.id,
      }, 
      { $pull : { friends: req.params.friendId }},
      { 
        new: true,
      }
    )
    res.json({message: 'Friend has been removed from this user'});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
}
}
};


module.exports = usersController;