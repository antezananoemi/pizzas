import { Provider } from "redux-bundler-react";
import Layout from "./layout";
import React from "react";

export default store => (
  <Provider store={store}>
    <Layout />
  </Provider>
);
