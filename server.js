const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect db
connectDB();

//Init Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get("/", (req, res) => res.send("Api running"));

//Define routes
app.use("/api/pizzas", require("./routes/api/pizzas"));
app.use("/api/toppings", require("./routes/api/toppings"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
