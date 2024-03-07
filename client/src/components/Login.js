import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate(); // Hook para la navegación

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Imprimir los valores antes de realizar la solicitud
      console.log('Valores enviados por POST:', { username, password });
      // Realiza la solicitud de inicio de sesión al backend
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      // Si la solicitud es exitosa, redirige a la página Home
      if (response.status === 200) {
        // Puedes almacenar información del usuario en el estado global o en localStorage si es necesario
        // ...

        // Redirige a la página Home
        navigate('/home');
      }
    } catch (error) {
      // Maneja los errores de inicio de sesión
      if (error.response.status === 401) {
        console.error('Credenciales incorrectas');
      } else {
        console.error('Error de inicio de sesión:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-5">
          <h2 className="heading-section title">PROYECTO INTEGRATIVA</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="login-wrap p-0">
            <form onSubmit={handleLogin}>
              <div className="form-group text-center">
                <p><strong>Sistema Login</strong></p>
              </div>
              <div className="form-group">
                <label>Usuario:</label>
                <input
                  className="form-control"
                  type="text"
                  name="txtnom"
                  placeholder="Ingrese el usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  className="form-control"
                  type="password"
                  name="txtpass"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-light" type="submit">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
