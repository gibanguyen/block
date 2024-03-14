const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Block = require("../models/Block");

// get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(404).json('user not found');
  };
});

// update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true, // just for postman
        }
      );

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You only can update your account");
  }
});

// delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Block.deleteMany({ userEmail: user.email });

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user not found");
    }
  } else {
    res.status(401).json("You only can delete your account");
  }
});

module.exports = router;
