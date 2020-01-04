const express = require("express");
const router = express.Router();

const Topping = require("../../models/Toppings");

// @route    GET api/toppings
// @desc     Test route
// @access   Public
router.get("/", async (req, res) => {
  let toppings = await Topping.find();
  res.status(200).send(toppings);
  res.send("Toppings route");
});
// @route    POST api/topping
// @desc     Test route
// @access   Public
router.post("/", async (req, res) => {
  const { name } = req.body;
  let topping = new Topping({
    name
  });
  await topping.save();
  res.send("Topping saved");
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }

  res.send("Toppings route");
});
router.delete("/:id", async (req, res) => {
  try {
    let topping = await Topping.findById(req.params.id);
    if (!topping) {
      return res.status(404).json({
        msg: "topping not found"
      });
    }
    await topping.remove();
    res.json({ msg: "Topping removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
