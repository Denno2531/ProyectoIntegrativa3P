// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Grupo 3
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/clients">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categorias
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orderDetails">
                Detalles Pedidos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">
                Pedidos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/providers">
                Proveedores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sales">
                Ventas
              </Link>
            </li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
