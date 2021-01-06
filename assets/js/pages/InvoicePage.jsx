import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import Select from "../components/forms/Select";
import CustomersAPI from "../services/customersAPI";

const InvoicePage = () => {
  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "",
  });

  const[customers, setCustomers] = useState([]);

  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: "",
  });

  const fetchCustomers = async () => {
    try {
        const data =  await CustomersAPI.findAll();
        setCustomers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [])

  // Handle inputs change on form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...customer, [name]: value });
  };

  return (
    <>
      <h1>Création d'un facture</h1>
      <form>
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
          {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
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
