const router = require("express").Router();

const Block = require("../models/Block");

// create block
router.post("/", async (req, res) => {
  const newBlock = new Block(req.body);
  try {
    const saveBlock = await newBlock.save();
    res.status(200).json(saveBlock);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get block
router.get("/:id", async (req, res) => {
  const block = await Block.findById(req.params.id);
  try {
    res.status(200).json(block);
  } catch (err) {
    res.status(404).json("block not found");
  }
});

// get all blocks
router.get("/", async (req, res) => {
    try {
        let blocks;
        if (req.body.userEmail) {
            blocks = await Block.find({ userEmail: req.body.userEmail });
        } else if (req.body.catName) {
            blocks = await Block.find({
                categories:{
                    $in: [req.body.catName],
                }
            })
        } else {
            blocks = await Block.find()
        }
        res.status(200).json(blocks);
    } catch (err) {
        res.status(404).json(err);
    };
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
