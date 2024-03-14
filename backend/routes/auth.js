const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      userEmail: req.body.userEmail,
      password: hashedPass,
    });
    
    await newUser.save();
    const { password, ...other } = newUser._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
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
      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } else res.status(404).json("Invalid email or password");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
