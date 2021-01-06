import axios from "axios";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return axios
    .post("https://127.0.0.1:8001/api/login_check", credentials)
    .then((response) => response.data.token)
    .then(token => {
        // Stock token in local storage
        window.localStorage.setItem("authToken", token);
      
        // Get axios knowing that we have a header in default for all HTTP requests
        axios.defaults.headers["Authorization"] = "Bearer " + token;

        return true;
    })
}

export default {
    authenticate,
    logout
}
