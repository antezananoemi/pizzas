import React from "react";
const NavBar = () => (
  <nav className="navbar bg-dark">
    <h1>
      <a href="/">
        <i className="fas fa-home" />
      </a>
    </h1>
    <ul>
      <li>
        <a href="/pizza">Create your Pizza</a>
      </li>
      <li>
        <a href="/">Pizzas</a>
      </li>
      <li>
        <a href="/toppings">Toppings</a>
      </li>
    </ul>
  </nav>
);

export default NavBar;
