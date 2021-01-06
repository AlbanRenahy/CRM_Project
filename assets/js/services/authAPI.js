import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return axios
    .post("https://127.0.0.1:8001/api/login_check", credentials)
    .then((response) => response.data.token)
    .then((token) => {
      // Stock token in local storage
      window.localStorage.setItem("authToken", token);

      // Get axios knowing that we have a header in default for all HTTP requests
      setAxiosToken(token);

      return true;
    });
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

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

export default {
  authenticate,
  logout,
  setup,
};
