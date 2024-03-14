const router = require("express").Router();

const category = require("../models/Category");
const Category = require("../models/Category");

// create category
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const saveCat = await newCat.save();
    res.status(200).json(saveCat);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get category
router.get("/:id", async (req, res) => {
  const block = await Category.findById(req.params.id);
  try {
    res.status(200).json(block);
  } catch (err) {
    res.status(404).json("category not found");
  }
});

// get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json(err);
  }
});

// update block
router.put("/:id", async (req, res) => {
  try {
    const block = await Block.findById(req.params.id);
    if (req.body.userEmail === block.userEmail) {
      try {
        const updateBlock = await Block.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updateBlock);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You only can update your own block");
    }
  } catch (err) {
    res.status(404).json("block not found");
  }
});

// delete block
router.delete("/:id", async (req, res) => {
  try {
    const block = await Block.findById(req.params.id);
    if (req.body.userEmail === block.userEmail) {
      try {
        await Block.findByIdAndDelete(req.params.id);
        res.status(200).json("Your block has been deleted");
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You only can delete your own block");
    }
  } catch (err) {
    res.status(404).json("block not found");
  }
});

module.exports = router;
