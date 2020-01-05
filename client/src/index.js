// eslint-disable-next-line no-unused-vars
import React from "react";
import "./App.css";
import { render } from "react-dom";
import cache from "./utils/cache";
import getStore from "./bundles";
import root from "./components/root";

cache.getAll().then(initialData => {
  render(root(getStore(initialData)), document.getElementById("root"));
});
