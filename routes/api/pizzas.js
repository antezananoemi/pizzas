const express = require("express");
const router = express.Router();

const Pizza = require("../../models/Pizza");
const Topping = require("../../models/Toppings");

// @route    GET api/pizzas
// @desc     Get all pizzas
// @access   Public
router.get("/", async (req, res) => {
  let pizzas = await Pizza.find();
  res.json(pizzas);
});

// @route    GET api/pizzas/:id
// @desc     Get a pizza by Id
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    let pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({
        msg: "pizza not found"
      });
    }
    res.json(pizza);
  } catch (error) {
    console.error(error);
    if (!error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "pizza not found"
      });
    }
    res.status(500).send("Server error");
  }
});

// @route    POST api/pizzas
// @desc     Create a pizza
// @access   Public
router.post("/", async (req, res) => {
  try {
    const { name, picture, toppings } = req.body;

    let newPizza = new Pizza({
      name,
      picture,
      toppings
    });
    const pizza = await newPizza.save();
    res.json(pizza);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route    DELETE api/pizzas/:id
// @desc     Delete a pizza
// @access   Public
router.delete("/:id", async (req, res) => {
  try {
    let pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({
        msg: "pizza not found"
      });
    }
    await pizza.remove();
    res.json({ msg: "Pizza removed" });
  } catch (error) {
    console.error(error.message);
    if (!error.kind === "ObjectId") {
      return res.status(404).json({
        msg: "pizza not found"
      });
    }
    res.status(500).send("Server error");
  }
});

// @route    PUT api/pizzas/toppings/:id
// @desc     Update a topping to pizza
// @access   Public
router.put("/toppings/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({
        msg: "pizza not found"
      });
    }
    console.log("toppings", pizza.toppings);

    // pizza.toppings.filter(topping => {
    //   const toppingOfP = topping._id.toString();
    //   if (!req.body.toppings.includes(toppingOfP)) {
    //     console.log("no tiene ese topping", req.body.toppings);
    //   }
    // });
    pizza.toppings = [...pizza.toppings, req.body.toppings];
    await pizza.save();
    res.json(pizza.toppings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
