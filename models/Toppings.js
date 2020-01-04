const mongoose = require("mongoose");

const ToppingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Topping = mongoose.model("toppings", ToppingsSchema);
