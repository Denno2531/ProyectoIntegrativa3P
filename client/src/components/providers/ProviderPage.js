import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function ProviderPage() {
  const [id, setId] = useState(0);
  const [nombreProveedor, setNombreProveedor] = useState('');
  const [telefonoProveedor, setTelefonoProveedor] = useState('');
  const [correoProveedor, setCorreoProveedor] = useState('');
  const [direccionProveedor, setDireccionProveedor] = useState('');
  const [editar, setEditar] = useState(false);

  const [proveedoresList, setProveedores] = useState([]);

  useEffect(() => {
    showProveedores();
  }, []);

  const addProveedor = () => {
    Axios.post('http://localhost:3001/createProveedores', {
      nombreProveedor: nombreProveedor,
      telefonoProveedor: telefonoProveedor,
      correoProveedor: correoProveedor,
      direccionProveedor: direccionProveedor,
    })
      .then(() => {
        showProveedores();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>El proveedor fue registrado con éxito!</i>`,
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

  const updateProveedor = () => {
    Axios.put('http://localhost:3001/updateProveedores', {
      id: id,
      nombreProveedor: nombreProveedor,
      telefonoProveedor: telefonoProveedor,
      correoProveedor: correoProveedor,
      direccionProveedor: direccionProveedor,
    })
      .then(() => {
        showProveedores();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>El proveedor fue actualizado con éxito!</i>`,
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

  const deleteProveedor = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar el proveedor?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteProveedores/${val.id}`, {}).then(() => {
          showProveedores();
          limpiarCampos();
          Swal.fire({
            title: `Proveedor fue eliminado.`,
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
    setNombreProveedor('');
    setTelefonoProveedor('');
    setCorreoProveedor('');
    setDireccionProveedor('');
    setId(0);
    setEditar(false);
  };

  const editProveedor = (val) => {
    setEditar(true);
    setId(val.id);
    setNombreProveedor(val.nombreProveedor);
    setTelefonoProveedor(val.telefonoProveedor);
    setCorreoProveedor(val.correoProveedor);
    setDireccionProveedor(val.direccionProveedor);
  };

  const showProveedores = () => {
    Axios.get('http://localhost:3001/readProveedores').then((response) => {
      setProveedores(response.data);
      console.log(response.data);
    });
  };

  return (
    <div>
      <Navbar />
      <div className='container mt-2'>
        <div className="card text-center">
          <div className="card-header">
            Gestion de Proveedores
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Nombre:</span>
              </div>
              <input
                type="text"
                onChange={(event) => {
                  setNombreProveedor(event.target.value);
                }}
                className="form-control"
                value={nombreProveedor}
                placeholder="Ingrese Nombre"
                aria-label="Nombre"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Teléfono:</span>
              </div>
              <input
                type="text"
                onChange={(event) => {
                  setTelefonoProveedor(event.target.value);
                }}
                className="form-control"
                value={telefonoProveedor}
                placeholder="Ingrese Teléfono"
                aria-label="Teléfono"
                aria-describedby="basic-addon2"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">Correo:</span>
              </div>
              <input
                type="text"
                onChange={(event) => {
                  setCorreoProveedor(event.target.value);
                }}
                className="form-control"
                value={correoProveedor}
                placeholder="Ingrese Correo"
                aria-label="Correo"
                aria-describedby="basic-addon3"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon4">Dirección:</span>
              </div>
              <input
                type="text"
                onChange={(event) => {
                  setDireccionProveedor(event.target.value);
                }}
                className="form-control"
                value={direccionProveedor}
                placeholder="Ingrese Dirección"
                aria-label="Dirección"
                aria-describedby="basic-addon4"
              />
            </div>

            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button onClick={updateProveedor} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                  </div>
                  : <button onClick={addProveedor} className='btn btn-success'>Registrar</button>
              }
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Correo</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedoresList.map((val) => (
                  <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombreProveedor}</td>
                    <td>{val.telefonoProveedor}</td>
                    <td>{val.correoProveedor}</td>
                    <td>{val.direccionProveedor}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                          type="button"
                          onClick={() => {
                            editProveedor(val);
                          }}
                          className="btn btn-info"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteProveedor(val);
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

export default ProviderPage;
