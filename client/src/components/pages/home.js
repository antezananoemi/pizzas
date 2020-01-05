import React from "react";

import ListPizzas from "../pizzas/ListPizzas";

const HomePage = () => (
  <>
    <a href="/pizza" className="btn btn-primary" style={{ float: "right" }}>
      Create your own Pizza
    </a>
    <br />
    <br />
    <ListPizzas />
  </>
);

export default HomePage;
