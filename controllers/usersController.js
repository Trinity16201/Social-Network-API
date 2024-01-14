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

addFriend(req,res) {
  Users.findAndUpdate(
    {_id: req.params.userId},
    {$addToSet: { friends: req.body.friendId || req.params.friendId}},
    { new: true}
  )
  .then(userData => {
    if (!userData) {
      return res.status(404).json({ message: 'Unable to locate user'})
    }
    res.json(userData);
  })
  .catch(err => res.status(500).json(err));
},

removeFriend({params}, res) {
  Users.findAndUpdate(
    { _id: params.userId},
    { $pull: { friends: params.friendId}},
    { new: true}
  )
  .then((dbUsers) => {
    if(!dbUsers) {
      return res.status(404).json({ message: 'Unable to locate user'})
    }
    const remove = !dbUsers.friends.includes(params.friendId);
    if (remove) {
      res.json({ message: 'Friend has been removed', dbUsers});
    } else {
      res.json(dbUsers);
    }
  })
  .catch(err => res.status(500).json(err));
}
};


module.exports = usersController;