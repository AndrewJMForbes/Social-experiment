const User = require("../models/User");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({_id: req.params.userId})
      .select("-__v")  
      // .populate("thoughts")
        .populate("friends");
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
  }
},
  async updateUser(req, res) {
     try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!'});
      }
      res.json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId)
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!'});
      }
      res.json({ message: 'User deleted!'})
    } catch (error) {
      res.status(500).json(error)
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.userId }, {
        $push: { friends: req.params.friendId}},
        { new: true, runValidators: true}
      )
        if (!user) {
          res.status(404).json({ message: 'No user found with this id!'});
        }
        res.json({message: 'Friend added!'});
    } catch (error) {
       res.status(500).json(error)
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.userId }, {
        $pull: { friends: req.params.friendId}},
        { new: true, runValidators: true}
      )
        if (!user) {
          res.status(404).json({ message: 'No user found with this id!'});
        }

        res.json({message: 'Friend deleted!'});
      } catch (error) {
        res.status(500).json(error)
      }
    }

  }
