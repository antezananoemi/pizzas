import qs from "qs";
import { isRequired, handleResponse, handleError } from "../utils/functions";
import { apiEndpoint } from "../utils/constants";

const endpoint = (path, { body, method = "get", type }) => {
  const headers = Object.assign({ "Content-Type": "application/json" });
  const apiURL = `${apiEndpoint}${path}`;

  let url;
  let params;
  if (
    body &&
    !(body instanceof FormData) &&
    (type !== "json" || method === "get")
  ) {
    if (method === "post") {
      params = new URLSearchParams();
      Object.keys(body).forEach(key => {
        params.append(key, body[key]);
      });
      url = new URL(apiURL);
    } else {
      params = qs.stringify(body);
      url = new URL(`${apiURL}?${params}`);
    }
  } else {
    url = new URL(apiURL);
  }
  const opts = { method, headers };
  if (method === "post" && !(body instanceof FormData)) {
    opts.body = type !== "json" ? params : JSON.stringify(body);
  } else if (body instanceof FormData) {
    opts.body = body;
  }
  return { url, opts };
};

const apiFetch = store => (
  path = isRequired(),
  params = { body: null, method: "get", type: "" }
) => {
  const { opts, url } = endpoint(path, params);
  return fetch(url, opts).then(handleResponse, handleError);
};

export default apiFetch;
