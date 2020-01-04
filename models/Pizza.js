const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PizzaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  toppings: [
    {
      toppings: {
        type: Schema.Types.ObjectId,
        ref: "toppings"
      }
    }
  ]
});

module.exports = Pizza = mongoose.model("pizza", PizzaSchema);
