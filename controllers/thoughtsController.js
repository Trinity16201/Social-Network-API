const { Thought, Users } = require('../models');

const thoughtsController = {
 getThoughts(req,res) {
      Thought.find({})
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(500).json(err));
    
 },
 getSingleThought(req,res) {
    Users.findById(req.params.userId)
    .then(userData => res.json(userData))
    .catch(err => res.status(500).json(err));
  },
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body)
      const user = await Users.findOneAndUpdate(
        { 
          _id: req.body.userId,
          thoughts: { $ne: newThought._id },
        }, 
        { $push : { thoughts: newThought._id }},
        { 
          new: true,
          unique: true,
        }
      );
      res.json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { 
          new: true, 
        },
      )
      if (!updatedThought) {
        res.status(404).json({
          message: 'Cannot find thought.',
        });
        return;
      }
      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async deleteSingleThought(req, res) {
    try {
      const thoughtRemoval = await Thought.findByIdAndDelete(req.params.id);
      if(!thoughtRemoval) {
        res.status(404).json({
          message: 'Could not locate thought.',
        })
        return;
      }
      const user = await Users.findOneAndUpdate(
        { 
          thoughts: { $eq: req.params.id },
        }, 
        { $pull : { thoughts: req.params.id }},
        { 
        }
      )
      res.json(thoughtRemoval);
    } catch (err) {
      console.log(err);
      res.status(500).json({message: 'Could not locate thought.'});
    }
  },
  async createReaction(req, res) {
    try {
      const newReaction = await Thought.findOne({ _id: req.params.id});
      if (!newReaction) {
        res.status(404).json({
          message: 'Thought not found.',
        })
      }
      newReaction.reactions.push(req.body);
      res.json(newReaction);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thoughtToRemoveReactionFrom = await Thought.findOne({ _id: req.params.id});
      if (!thoughtToReactTo) {
        res.status(404).json({
          message: 'Could not locate thought.',
        })
      }
      thoughtToRemoveReactionFrom.reactions.id(req.body.reactionId).remove();
      res.json(thoughtToReactTo);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }

  },
}

module.exports = thoughtsController;