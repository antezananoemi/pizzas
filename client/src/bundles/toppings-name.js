import { createAsyncResourceBundle, createSelector } from "redux-bundler";

const name = "pizzas";
const baseType = name.toUpperCase();
const actions = {
  STARTED: `${baseType}_FETCH_STARTED`,
  FINISHED: `${baseType}_FETCH_FINISHED`,
  FAILED: `${baseType}_FETCH_FAILED`,
  CLEARED: `${baseType}_CLEARED`,
  OUTDATED: `${baseType}_OUTDATED`,
  EXPIRED: `${baseType}_EXPIRED`
};

const promise = ({ store, apiFetch }) => {
  const routeParams = store.selectRouteParams();
  const body = { ...routeParams };
  return apiFetch("pizzas", { body });
};
const promiseToppingsNames = ({ store, apiFetch }, args) => {
  let body = args;

  return apiFetch(`pizzas/toppings`, { body, method: "post", type: "json" });
};
const bundle = createAsyncResourceBundle({
  name,
  getPromise: promise,
  persist: false
});

bundle.doToppingsNames = (params = {}) => args => {
  const { dispatch } = args;
  dispatch({ type: actions.STARTED });
  return promiseToppingsNames(args, { ...params }).then(
    payload => {
      dispatch({ type: actions.FINISHED, payload });
    },
    error => {
      dispatch({ type: actions.FAILED, error });
    }
  );
};

// bundle.selectToppingsnamesErrorType = createSelector(
//   "selectToppingsNamesDataRaw",
//   raw => raw.errorType
// );

export default bundle;
