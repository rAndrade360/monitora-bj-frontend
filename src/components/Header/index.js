import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Materialize from 'materialize-css/dist/js/materialize';
import logo from '../../assets/logo-header.svg';

import './styles.css';

function Header() {
  useEffect(() => {
    const select = document.querySelector('.dropdown-trigger');
    const options = {
      inDuration: 300,
      outDuration: 300,
      coverTrigger: false,
      hover: true,
    };
    Materialize.Dropdown.init(select, options);
    var elems = document.querySelectorAll('.sidenav');
    var elemsCollapsible = document.querySelectorAll('.collapsible');
    Materialize.Collapsible.init(elemsCollapsible);
    Materialize.Sidenav.init(elems);
  }, []);

  return (
    <header>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to={`/dashboard/patients/1`} className="text-black">
            Buscar
          </Link>
        </li>
        <li>
          <Link to={`/dashboard/patient/store`} className="text-black">
            Cadastrar
          </Link>
        </li>
      </ul>
      <nav className="white">
        <div className="container">
          <div className="nav-wrapper">
            <a href="/dashboard" className="brand-logo">
              <img
                src={logo}
                className="logo-style"
                alt="Logo do monitora-BJ"
              />
            </a>
            <a data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons text-black">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/dashboard" className="text-black">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dailyreport" className="text-black">
                  Relatório diário
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-trigger text-black"
                  to={`/dashboard/patients/1`}
                  data-target="dropdown1"
                >
                  Pacientes
                  <i className="material-icons right">arrow_drop_down</i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/dashboard" className="text-black">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dailyreport" className="text-black">
            Relatório diário
          </Link>
        </li>
        <li className="no-padding">
          <ul className="collapsible collapsible-accordion">
            <li>
              <button className="collapsible-header">
                Pacientes <i className="material-icons">arrow_drop_down</i>
              </button>
              <div className="collapsible-body">
                <ul>
                  <li>
                    <Link to={`/dashboard/patients/1`} className="text-black">
                      Buscar
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/dashboard/patient/store`}
                      className="text-black"
                    >
                      Cadastrar
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
}

export default Header;
