import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import image from '../../assets/img.svg';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../contexts/Auth';
import './styles.css';

function Login() {
  const [form, setForm] = useState({
    acess_id: '',
    password: '',
  });

  const { signIn } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signIn({
      access_id: form.acess_id,
      password: form.password,
    });
  }

  function changeForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div className="app-login">
      <form
        className="form-container col s6"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="row">
          <img src={logo} alt="Logo da monitora-BJ" />
        </div>
        <div className="row">
          <h1 className="title">Faça seu login</h1>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="acess_id"
              id="acess_id"
              type="text"
              className="validate"
              onChange={changeForm}
              value={form.acess_id}
              required
            />
            <label htmlFor="acess_id">Id de acesso:</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="password"
              id="password"
              type="password"
              className="validate"
              onChange={changeForm}
              value={form.password}
              required
            />
            <label htmlFor="password">Senha:</label>
          </div>
        </div>
        <button
          class="btn blue waves-effect waves-light"
          type="submit"
          name="action"
        >
          Entrar
        </button>
      </form>
      <div className="side-container col s6 hide-on-med-and-down">
        <img src={image} className="side-image" alt="Imagem enfermeiros" />
      </div>
    </div>
  );
}

export default Login;
