import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Materialize from 'materialize-css/dist/js/materialize';
import logo from '../../assets/logo-header.svg';
import { useAuth } from '../../contexts/Auth';

import './styles.css';

function Header() {
  const { signOut, user } = useAuth();
  useEffect(() => {
    const select = document.querySelectorAll('.dropdown-trigger');
    const options = {
      inDuration: 300,
      outDuration: 300,
      coverTrigger: false,
      hover: true,
    };
    Materialize.Dropdown.init(select, options);
    const elems = document.querySelectorAll('.sidenav');
    const elemsCollapsible = document.querySelectorAll('.collapsible');
    Materialize.Collapsible.init(elemsCollapsible);
    Materialize.Sidenav.init(elems);
  }, []);

  return (
    <header>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to="/dashboard/patients/1" className="text-black">
            Buscar
          </Link>
        </li>
        {user.permission !== 'test_center' ? (
          <li>
            <Link to="/dashboard/patient/store" className="text-black">
              Cadastrar
            </Link>
          </li>
        ) : null}
      </ul>
      <ul id="dropdown3" className="dropdown-content">
        <li>
          <Link to="/dashboard" className="text-black">
            Relatório geral
          </Link>
        </li>
        {user.permission !== 'test_center' ? (
          <li>
            <Link to="/dailyreport" className="text-black">
              Relatório diário
            </Link>
          </li>
        ) : null}
      </ul>
      <ul id="dropdown2" className="dropdown-content">
        <li>
          <Link to="/dashboard/strategies" className="text-black">
            Buscar
          </Link>
        </li>
        <li>
          <Link to="/dashboard/strategy/store" className="text-black">
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
            {/* eslint-disable-next-line */}
            <a href="#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons text-black">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link
                  className="dropdown-trigger text-black"
                  to={`/dashboard`}
                  data-target="dropdown3"
                >
                  Relatórios
                  <i className="material-icons right">arrow_drop_down</i>
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
              {user.permission === 'secretary' ? (
                <li>
                  <Link
                    className="dropdown-trigger text-black"
                    to={`/dashboard/patients/1`}
                    data-target="dropdown2"
                  >
                    Estratégias
                    <i className="material-icons right">arrow_drop_down</i>
                  </Link>
                </li>
              ) : null}

              <li>
                <Link
                  to="/login"
                  className="text-black"
                  onClick={() => signOut()}
                >
                  <i className="material-icons left">exit_to_app</i>
                  sair
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li className="no-padding">
          <ul className="collapsible collapsible-accordion">
            <li>
              <button className="collapsible-header">
                Relatórios <i className="material-icons">arrow_drop_down</i>
              </button>
              <div className="collapsible-body">
                <ul className="sidenav-close">
                  <li>
                    <Link to="/dashboard" className="text-black">
                      Relatório geral
                    </Link>
                  </li>
                  {user.permission !== 'test_center' ? (
                    <li>
                      <Link to="/dailyreport" className="text-black">
                        Relatório diário
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </li>
            <li>
              <button className="collapsible-header">
                Pacientes <i className="material-icons">arrow_drop_down</i>
              </button>
              <div className="collapsible-body">
                <ul className="sidenav-close">
                  <li>
                    <Link to="/dashboard/patients/1" className="text-black">
                      Buscar
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/patient/store" className="text-black">
                      Cadastrar
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {user.permission === 'secretary' ? (
              <li>
                <button className="collapsible-header">
                  Estratégias <i className="material-icons">arrow_drop_down</i>
                </button>
                <div className="collapsible-body">
                  <ul className="sidenav-close">
                    <li>
                      <Link to="/dashboard/strategies" className="text-black">
                        Buscar
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/strategy/store"
                        className="text-black"
                      >
                        Cadastrar
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            ) : null}
          </ul>
        </li>

        <li className="sidenav-close">
          <Link to="/login" className="text-black" onClick={() => signOut()}>
            <i className="material-icons left">exit_to_app</i>
            sair
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
