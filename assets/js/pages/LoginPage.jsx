import React, { useEffect, useState } from "react";

const LoginPage = (props) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = event => {
      event.preventDefault();
      console.log(credentials);
  }

  return (
    <>
      <h1>Connexion à l'application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="_username">Adresse email</label>
          <input
            value={credentials.username}
            onChange={handleChange}
            type="email"
            placeholder="Adresse email de connexion"
            name="username"
            id="username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="_password">Mot de passe</label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type="password"
            placeholder="Mot de passe"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Connexion
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
