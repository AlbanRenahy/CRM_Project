import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import Select from "../components/forms/Select";
import CustomersAPI from "../services/customersAPI";
import axios from "axios";

const InvoicePage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "SENT",
  });

  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: "",
  });

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchInvoice = async (id) => {
    try {
      const data = await axios
        .get("https://127.0.0.1:8001/api/invoices/" + id)
        .then((response) => response.data);

      const { amount, status, customer } = data;

      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {}
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  // Handle inputs change on form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        const response = await axios.put(
          "https://127.0.0.1:8001/api/invoices/" + id,
          { ...invoice, customer: `/api/customers/${invoice.customer}` }
        );
        // TODO: Flash notif success
        console.log(response);
      } else {
        const response = await axios.post(
          "https://127.0.0.1:8001/api/invoices",
          {
            ...invoice,
            customer: `/api/customers/${invoice.customer}`,
          }
        );
        // TODO flash notif success
        history.replace("/invoices");
      }
      console.log(response);
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
        // TODO: Flash errors notification
      }
    }
  };

  return (
    <>
      {(editing && <h1>Modifier la facture</h1>) || (
        <h1>Création d'une facture</h1>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="amount"
          label="Montant"
          placeholder="Montant de de la facture"
          type="number"
          value={invoice.amount}
          onChange={handleChange}
          error={errors.amount}
        />
        <Select
          name="customer"
          label="Client"
          value={invoice.customer}
          error={errors.customer}
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </Select>
        <Select
          name="status"
          label="Statut"
          value={invoice.status}
          error={errors.status}
          onChange={handleChange}
        >
          <option value="SENT">Envoyée</option>
          <option value="PAID">Payée</option>
          <option value="CANCELLED">Annulée</option>
        </Select>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/invoices" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default InvoicePage;
