import { createAsyncResourceBundle, createSelector } from "redux-bundler";

const name = "toppings";
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
  return apiFetch("toppings", { body });
};
const promiseSaveToppings = ({ store, apiFetch }, args) => {
  let body = args;
  return apiFetch(`toppings`, { body, method: "post", type: "json" });
};
const promiseRemoveToppings = ({ store, apiFetch }, args) => {
  let body = args.id;

  return apiFetch(`toppings/${body}`, {
    body,
    method: "delete",
    type: "json"
  });
};

const bundle = createAsyncResourceBundle({
  name,
  getPromise: promise,
  persist: false
});

bundle.doSaveToppings = (params = {}) => args => {
  const { dispatch } = args;
  dispatch({ type: actions.STARTED });
  return promiseSaveToppings(args, { ...params }).then(
    payload => {
      dispatch({ type: actions.FINISHED, payload });
    },
    error => {
      dispatch({ type: actions.FAILED, error });
    }
  );
};
bundle.doRemoveToppings = (params = {}) => args => {
  const { dispatch } = args;
  dispatch({ type: actions.STARTED });
  return promiseRemoveToppings(args, { ...params }).then(
    payload => {
      dispatch({ type: actions.FINISHED, payload });
    },
    error => {
      dispatch({ type: actions.FAILED, error });
    }
  );
};
bundle.selectNewtoppingsErrorType = createSelector(
  "selectToppingsRaw",
  raw => raw.errorType
);

export default bundle;
