import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "../config";

// Remove token from localStorage and axios
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

/**
 * HTTP Request to authenticate and stock token in local storage and axios
 *
 * @param {object} credentials
 */
function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      // Stock token in local storage
      window.localStorage.setItem("authToken", token);

      // Get axios knowing that we have a header in default for all HTTP requests
      setAxiosToken(token);

      return true;
    });
}

/**
 * Place the token in axios
 *
 * @param {string} token Token jwt
 */
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

// Set up when app is loaded
function setup() {
  //1. See if we have a token
  const token = window.localStorage.getItem("authToken");

  //2. If token is valid
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Allow to know if we are connected or not
 * @returns {bool}
 */
function isAuthenticated() {
  //1. See if we have a token
  const token = window.localStorage.getItem("authToken");

  //2. If token is valid
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
};
