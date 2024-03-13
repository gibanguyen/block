const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// update
router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
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
    res.status(401).json("You can update your account");
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.body.userEmail });

    if (!user) {
      res.status(404).json("Invalid email or password");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);

    if (validated) {
      res.status(200).json(user);
    } else res.status(404).json("Invalid email or password");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
