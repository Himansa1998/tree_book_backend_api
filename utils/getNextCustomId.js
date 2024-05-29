const Item = require("../models/Item");

const getNextCustomId = async () => {
  try {
    const lastItem = await Item.findOne().sort({ customId: -1 });
    console.log("Last Item:", lastItem);
    if (!lastItem || !lastItem.customId) {
      console.log(
        "No items found or last item has no customId. Returning TR00001."
      );
      return "TR00001";
    }
    const lastId = lastItem.customId;
    const numberPart = parseInt(lastId.substring(2));
    const newIdNumber = (numberPart + 1).toString().padStart(5, "0");
    console.log(`Generated new customId: TR${newIdNumber}`);
    return `TR${newIdNumber}`;
  } catch (error) {
    console.error("Error generating customId:", error);
    throw error;
  }
};

module.exports = getNextCustomId;
