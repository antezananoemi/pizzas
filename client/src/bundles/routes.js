import { createRouteBundle } from "redux-bundler";
import HomePage from "../components/pages/home";
import CreatePizza from "../components/pizzas/CreatePizza";
import PizzaDetail from "../components/pages/PizzaDetail";
import Toppings from "../components/pages/Toopings";
import NotFound from "../components/pages/not-found";
import { PUBLIC_URL } from "../utils/constants";

const pages = {
  [`${PUBLIC_URL}/`]: HomePage,
  [`${PUBLIC_URL}/pizza`]: CreatePizza,
  [`${PUBLIC_URL}/pizza/:id`]: PizzaDetail,
  [`${PUBLIC_URL}/toppings`]: Toppings,
  "*": NotFound
};
export default createRouteBundle(pages);
