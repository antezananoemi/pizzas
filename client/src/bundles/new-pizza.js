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
const promiseSavePizzas = ({ store, apiFetch }, args) => {
  let body = args;
  return apiFetch(`pizzas`, { body, method: "post", type: "json" });
};
const promiseRemovePizzas = ({ store, apiFetch }, args) => {
  let body = args.id;

  return apiFetch(`pizzas/${body}`, {
    body,
    method: "delete",
    type: "json"
  });
};
const promiseUpdatePizzas = ({ store, apiFetch }, args) => {
  let body = args;

  return apiFetch(`pizzas/toppings/${args.id}`, {
    body,
    method: "post",
    type: "json"
  });
};
const bundle = createAsyncResourceBundle({
  name,
  getPromise: promise,
  persist: false
});

bundle.doSavePizzas = (params = {}) => args => {
  const { dispatch } = args;
  dispatch({ type: actions.STARTED });
  return promiseSavePizzas(args, { ...params }).then(
    payload => {
      dispatch({ type: actions.FINISHED, payload });
    },
    error => {
      dispatch({ type: actions.FAILED, error });
    }
  );
};
bundle.doRemovePizzas = (params = {}) => args => {
  const { dispatch } = args;
  dispatch({ type: actions.STARTED });
  return promiseRemovePizzas(args, { ...params }).then(
    payload => {
      dispatch({ type: actions.FINISHED, payload });
    },
    error => {
      dispatch({ type: actions.FAILED, error });
    }
  );
};
bundle.doUpdatePizzas = (params = {}) => args => {
  const { dispatch } = args;
  dispatch({ type: actions.STARTED });
  return promiseUpdatePizzas(args, { ...params }).then(
    payload => {
      dispatch({ type: actions.FINISHED, payload });
    },
    error => {
      dispatch({ type: actions.FAILED, error });
    }
  );
};
bundle.selectNewpizzaErrorType = createSelector(
  "selectPizzasRaw",
  raw => raw.errorType
);

export default bundle;
