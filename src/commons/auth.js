import { SPOTIFY_ACCESS_TOKEN } from "../constants";

const isAuthenticated = () =>
  localStorage.getItem(SPOTIFY_ACCESS_TOKEN) !== null;

const getToken = () => localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

const setToken = access_token =>
  localStorage.setItem(SPOTIFY_ACCESS_TOKEN, access_token);

const removeToken = () => localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);

export default {
  isAuthenticated,
  getToken,
  setToken,
  removeToken
};
