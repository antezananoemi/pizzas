import React from "react";
import ListToppings from "../toppings/ListToppings";
import CreateToppings from "../toppings/CreateToppings";

const ToopingsPage = () => (
  <>
    <h1 className="large text-primary">Toppings</h1>
    <CreateToppings />
    <br />
    <hr />
    <br />
    <ListToppings />
  </>
);
export default ToopingsPage;
