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
  Item.findOneAndDelete({ customId: req.params.id })
    .then((item) => res.json({ success: true }))
    .catch((err) =>
      res.status(404).json({ noitemfound: "No item found with that ID" })
    );
});

module.exports = router;
