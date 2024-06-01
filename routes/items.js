const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const getNextCustomId = require("../utils/getNextCustomId");

// @route GET api/items
// @desc Get All Items
router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ noitemsfound: "No items found" }));
});

// @route POST api/items
// @desc Create An Item
router.post("/", async (req, res) => {
  try {
    const customId = await getNextCustomId();
    const newItem = new Item({
      customId: customId,
      name: req.body.name,
      scientificName: req.body.scientificName,
      description: req.body.description,
      photo: req.body.photo,
    });
    const item = await newItem.save();
    res.json(item);
    console.log(item)
  } catch (err) {
    console.error("Error saving item:", err);
    res
      .status(400)
      .json({ error: "Unable to save item", details: err.message });
  }
});

// @route GET api/items/:id
// @desc Get A Single Item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ customId: req.params.id });
    if (!item) {
      return res.status(404).json({ error: "No item found with that ID" });
    }
    res.json(item);
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// @route DELETE api/items/:id
// @desc Delete An Item
router.delete("/delete-card/:id", (req, res) => {
  console.log(`Received request to delete card with customId: ${req.params.id}`);
  Item.findOneAndDelete({ customId: req.params.id })
    .then((item) => {
      if (item) {
        res.json({ success: true });
      } else {
        res.status(404).json({ noitemfound: "No item found with that ID" });
      }
    })
    .catch((err) => {
      console.error("Error occurred while deleting item:", err);
      res.status(500).json({ error: "An error occurred" });
    });
});

router.put("/update-tree/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findOneAndUpdate(
      { customId: req.params.id },
      {
        name: req.body.name,
        scientificName: req.body.scientificName,
        description: req.body.description,
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "No item found with that ID" });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
