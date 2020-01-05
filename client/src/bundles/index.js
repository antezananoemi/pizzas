import {
  appTimeBundle,
  asyncCountBundle,
  composeBundlesRaw,
  createReactorBundle,
  createUrlBundle,
  debugBundle,
  onlineBundle
} from "redux-bundler";
import extraArgs from "./extra-args";
import routes from "./routes";
import toppingsList from "./toppings-list";
import pizzasList from "./pizzas-list";
import pizzaDetail from "./pizza-detail";
import newPizza from "./new-pizza";
import newToppings from "./new-toppings";
import toppingsName from "./toppings-name";

export default composeBundlesRaw(
  appTimeBundle,
  asyncCountBundle,
  onlineBundle,
  createUrlBundle(),
  createReactorBundle({ idleTimeout: 10000 }),
  debugBundle,
  extraArgs,
  routes,
  toppingsList,
  pizzasList,
  pizzaDetail,
  newPizza,
  newToppings,
  toppingsName
);
