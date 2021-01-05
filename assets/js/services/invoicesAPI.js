import axios from "axios";

function findAll() {
  return axios
    .get("https://127.0.0.1:8001/api/invoices")
    .then((response) => response.data["hydra:member"]);
}

function deleteInvoice(id) {
  return axios.delete("https://127.0.0.1:8001/api/invoices/" + id);
}

export default {
  findAll,
  delete: deleteInvoice,
};
