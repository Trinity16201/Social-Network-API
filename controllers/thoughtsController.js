const { Thoughts, Users, Reactions } = require('../models');
const {Types} = require('mongoose');

const thoughtsController = {
 getThoughts(req,res) {
      Thoughts.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(500).json(err));
    
 },
 getSingleThought(req,res) {
    Users.findById(req.params.userId)
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err));
  },
  
  createThought(req,res) {
    Users.create(req.body)
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err))
  },
  
  updateThought(req,res) {
    Users.findAndUpdate(req.params.id, req.body, {new:true})
    .then(userData => {
      if(!userData) {
        return res.status(404).json({ message: 'Unable to locate user'});
      }
      res.json(userData)
    })
    
  },
  deleteReaction(req,res) {
    Users.findAndDelete(req.params.id)
    .then(userData => {
      if (!userData) {
        return res.status(404).json({ message: 'Unable to locate user'})
      }
      res.json({ message: 'Deleted user complete'});
    })
    .catch(err => res.status(500).json(err));
  },

}

module.exports = thoughtsController;