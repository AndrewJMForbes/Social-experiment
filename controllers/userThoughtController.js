const { Thoughts, User } = require("../models");
const Thought = require("../models/Thoughts");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughtsData = await Thoughts.find({});
      res.json(thoughtsData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thoughtsData = await Thoughts.findOne({_id: req.params.thoughtId})
        // .populate("thoughts")
        .populate("reactions");
      if (!thoughtsData) {
        res.status(404).json({ message: "No thought found with this id!" });
      }
      res.json(thoughtsData);
    } catch (error) {
      res.status(500).json(error);
    }
    // try {
    //   const thoughtsData = await Thoughts.findOne({_id: req.params.id})
    //   .populate("reactions");
    //   if (!thoughtsData) {
    //     return res
    //       .status(404)
    //       .json({ message: "No thoughts found with this id!" });
    //   }
    //   res.json(thoughtsData);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json(error);
    // }
  },

  async createThought(req, res) {
    try {
      const thoughtsData = await Thoughts.create(req.body);
      const user= await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtsData._id } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "Thought posted but no user found with this id!" });
      }
      res.json({ message: "Thoughts created!" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughtsData = await Thoughts.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!thoughtsData) {
        res.status(404).json({ message: 'No user found with this id!'});
      }
      res.json(thoughtsData)
    } catch (error) {
      res.status(500).json(error)
    }
    // try {
    //   const thoughtsData = await Thoughts.findOneAndUpdate(
    //     { _id: req.params.thoughtid },
    //     { $set: req.body },
    //     { runValidators: true, new: true }
    //   );
    //   if (!thoughtsData) {
    //     return res
    //       .status(404)
    //       .json({ message: "No thoughts found with this id!" });
    //   }
    //   res.json({ message: "Thoughts updated!" });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json(error);
    // }
  },

  async deleteThought(req, res) {
    try {
      const thoughtsData = await Thoughts.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "No thoughts found with this id!" });
      }
      res.json({ message: "Thoughts deleted!" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async createReaction(req, res) {
    try {
      const thoughtsData = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "No thoughts found with this id!" });
      }
      res.json({ message: "Reaction created!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteReaction(req, res) {
    //todo
    try {
      const thoughtsData = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thoughtsData) {
        return res
          .status(404)
          .json({ message: "No thoughts found with this id!" });
      }
      res.json({ message: "Reaction created!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
