import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function UserPage() {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [editar, setEditar] = useState(false);

  const [usuariosList, setUsuarios] = useState([]);

  useEffect(() => {
    showUsuarios();
  }, []);

  const addUsuario = () => {
    Axios.post('http://localhost:3001/createUsuarios', {
      username: username,
      password: password,
      role: role,
    })
      .then(() => {
        showUsuarios();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>El usuario fue registrado con éxito!</i>`,
          icon: 'success',
          timer: 3000,
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..',
          text: JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const updateUsuario = () => {
    Axios.put('http://localhost:3001/updateUsuarios', {
      id: id,
      username: username,
      password: password,
      role: role,
    })
      .then(() => {
        showUsuarios();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>El usuario fue actualizado con éxito!</i>`,
          icon: 'success',
          timer: 3000,
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Ooops..',
          text: JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const deleteUsuario = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar el usuario?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteUsuarios/${val.id}`, {}).then(() => {
          showUsuarios();
          limpiarCampos();
          Swal.fire({
            title: `Usuario fue eliminado.`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: JSON.parse(JSON.stringify(error)).message,
          });
        });
      }
    });
  };

  const limpiarCampos = () => {
    setUsername('');
    setPassword('');
    setRole('');
    setId(0);
    setEditar(false);
  };

  const editUsuario = (val) => {
    setEditar(true);
    setId(val.id);
    setUsername(val.username);
    setPassword(val.password);
    setRole(val.role);
  };

  const showUsuarios = () => {
    Axios.get('http://localhost:3001/readUsuarios').then((response) => {
      setUsuarios(response.data);
      console.log(response.data);
    });
  };

  return (
    <div>
      <Navbar />
      <div className='container mt-2'>
        <div className="card text-center">
          <div className="card-header">
            Gestion de Usuarios
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Usuario:</span>
              </div>
              <input
                type="text"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                className="form-control"
                value={username}
                placeholder="Ingrese Usuario"
                aria-label="Usuario"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Contraseña:</span>
              </div>
              <input
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                className="form-control"
                value={password}
                placeholder="Ingrese Contraseña"
                aria-label="Contraseña"
                aria-describedby="basic-addon2"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">Rol:</span>
              </div>
              <input
                type="text"
                onChange={(event) => {
                  setRole(event.target.value);
                }}
                className="form-control"
                value={role}
                placeholder="Ingrese Rol"
                aria-label="Rol"
                aria-describedby="basic-addon3"
              />
            </div>

            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button onClick={updateUsuario} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                  </div>
                  : <button onClick={addUsuario} className='btn btn-success'>Registrar</button>
              }
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Contraseña</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosList.map((val) => (
                  <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.username}</td>
                    <td>{val.password}</td>
                    <td>{val.role}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                          type="button"
                          onClick={() => {
                            editUsuario(val);
                          }}
                          className="btn btn-info"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteUsuario(val);
                          }}
                          className="btn btn-danger"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
