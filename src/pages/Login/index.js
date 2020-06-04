import React, { useState } from 'react';
import image from '../../assets/img.svg';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../contexts/Auth';
import './styles.css';

function Login({ history }) {
  const [form, setForm] = useState({
    acess_id: '',
    password: '',
  });

  const { signIn, signed } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    signIn({
      acess_id: form.acess_id,
      password: form.password,
    });
  }

  function changeForm(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (signed) {
      history.push(['/dashboard']);
    }
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
              placeholder="Infome seu id"
              name="acess_id"
              id="acess_id"
              type="text"
              className="validate"
              onChange={changeForm}
              value={form.acess_id}
            />
            <label htmlFor="acess_id">Id de acesso:</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder="Infome sua senha"
              name="password"
              id="password"
              type="password"
              className="validate"
              onChange={changeForm}
              value={form.password}
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
