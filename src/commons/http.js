import axios from "axios";

export const DEFAULT_QUERY_STRING = Object.freeze({ page: 0, size: 20 });

export const responseInterceptor = error => {
  return error.response
    ? Promise.resolve(error.response)
    : Promise.reject(error);
};

export const requestInterceptor = config => {
  const token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const createClient = (baseURL = "", requester = axios) => {
  const client = requester.create({ baseURL });

  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(null, responseInterceptor);
  return client;
};

export const objectToQueryString = (object = {}) =>
  `?${Object.keys(object)
    .map(key => `${key}=${object[key]}`)
    .join("&")}`;
