import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "primary",
  CANCELLED: "danger",
};

const STATUS_LABELS = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée",
};

const InvoicesPage = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  // Retrive invoices from api
  const fetchInvoices = async () => {
    try {
      const data = await axios
        .get("https://127.0.0.1:8001/api/invoices")
        .then((response) => response.data["hydra:member"]);
      setInvoices(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des factures")
    }
  };

  // Load invoices on component loading
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Handle page changing
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle research
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value);
    setCurrentPage(1);
  };

  // Handle delete invoice
  const handleDelete = async (id) => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter((invoice) => invoice.id !== id));

    try {
      await axios.delete("https://127.0.0.1:8001/api/invoices/" + id);
      toast.success("La facture a bien été suppimée")
    } catch (error) {
      toast.error("Une erreur est survenue");
      setInvoices(originalInvoices);
    }
  };

  const formatDate = (str) => moment(str).format("DD/MM/YYYY");
  const itemsPerPage = 10;

  // Handle search
  const filteredInvoices = invoices.filter(
    (c) =>
      c.customer.firstName.toLowerCase().includes(search) ||
      c.customer.lastName.toLowerCase().includes(search) ||
      c.amount.toString().includes(search) ||
      STATUS_LABELS[c.status].toLowerCase().includes(search)
  );

  // Data pagination
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h1>Liste des factures</h1>
        <Link to="/invoices/new" className="btn btn-primary">
          Créer une facture
        </Link>
      </div>
      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Rechercher..."
        />
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Client</th>
            <th className="text-center">Date d'envoi</th>
            <th className="text-center">Statut</th>
            <th className="text-center">Montant</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.chrono}</td>
              <td>
                <a href="#">
                  {invoice.customer.firstName} {invoice.customer.lastName}
                </a>
              </td>
              <td className="text-center">{formatDate(invoice.sentAt)}</td>
              <td className="text-center">
                <span
                  className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                >
                  {STATUS_LABELS[invoice.status]}
                </span>
              </td>
              <td className="text-center">
                {invoice.amount.toLocaleString()} €
              </td>
              <td>
                <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-primary mr-1">Editer</Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChanged={handlePageChange}
        length={filteredInvoices.length}
      />
    </>
  );
};

export default InvoicesPage;
