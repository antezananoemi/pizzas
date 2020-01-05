const express = require("express");
const router = express.Router();

const Pizza = require("../../models/Pizza");
const Topping = require("../../models/Toppings");

const getToppings = async toppings => {
  const newToppings = await Promise.all(
    toppings.map(async topping => {
      return await Topping.findById(topping._id);
    })
  );

  return newToppings;
};

// @route    GET api/pizzas
// @desc     Get all pizzas
// @access   Public
router.get("/", async (req, res) => {
  try {
    let pizzas = await Pizza.find();
    pizzas = await Promise.all(
      pizzas.map(async pizza => {
        let tooP = pizza.toppings;
        pizza.toppings[0] = await getToppings(tooP);
        return pizza;
      })
    );
    res.json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route    POST api/pizzas/toppings/
// @desc     Get all topping for pizza
// @access   Public
router.post("/toppings", async (req, res) => {
  const { toppings } = req.body;
  const newToppings = await Promise.all(
    toppings.map(async topping => {
      return await Topping.findById(topping._id);
    })
  );
  res.json(newToppings);
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
    let tooP = pizza.toppings;
    pizza.toppings[0] = await getToppings(tooP);

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
    res.json({ msg: "Pizza added" });
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

// @route    POST api/pizzas/toppings/:id
// @desc     Update a topping to pizza
// @access   Public
router.post("/toppings/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({
        msg: "pizza not found"
      });
    }
    pizza.toppings = req.body.toppings;
    await pizza.save();
    res.send("ok");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
