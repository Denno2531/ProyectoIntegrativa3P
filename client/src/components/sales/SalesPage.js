import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function SalesPage() {
  const [id, setId] = useState(0);
  const [IdUsuario, setIdUsuario] = useState(0);
  const [fechaVenta, setFechaVenta] = useState('');
  const [editar, setEditar] = useState(false);

  const [ventasList, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    showVentas();
    showUsuarios();
  }, []);

  // ...

const addVenta = () => {
    // Formatear la fecha antes de enviarla al servidor
    const formattedFechaVenta = new Date(fechaVenta).toISOString().split('T')[0];
  
    Axios.post('http://localhost:3001/createVentas', {
      IdUsuario: IdUsuario,
      fechaVenta: formattedFechaVenta,
    })
      .then(() => {
        showVentas();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>La venta fue registrada con éxito!</i>`,
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

  const updateVenta = () => {
    Axios.put('http://localhost:3001/updateVentas', {
      id: id,
      IdUsuario: IdUsuario,
      fechaVenta: fechaVenta,
    })
      .then(() => {
        showVentas();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>La venta fue actualizada con éxito!</i>`,
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

  const deleteVenta = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar la venta?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteVentas/${val.id}`, {}).then(() => {
          showVentas();
          limpiarCampos();
          Swal.fire({
            title: `Venta fue eliminada.`,
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
    setIdUsuario(0);
    setFechaVenta('');
    setId(0);
    setEditar(false);
  };

  const editVenta = (val) => {
    setEditar(true);
    setId(val.id);
    setIdUsuario(val.IdUsuario);
    setFechaVenta(val.fechaVenta);
  };

  const showVentas = () => {
    Axios.get('http://localhost:3001/readVentas').then((response) => {
      setVentas(response.data);
      console.log(response.data);
    });
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
            Gestion de Ventas
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="usuarioSelect">Usuario:</label>
              </div>
              <select
                className="custom-select"
                id="usuarioSelect"
                onChange={(event) => setIdUsuario(event.target.value)}
                value={IdUsuario}
              >
                <option value="0">Seleccione un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Fecha de Venta:</span>
              </div>
              <input
                type="date"
                onChange={(event) => setFechaVenta(event.target.value)}
                className="form-control"
                value={fechaVenta}
                placeholder="Ingrese Fecha de Venta"
                aria-label="Fecha de Venta"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button onClick={updateVenta} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                  </div>
                  : <button onClick={addVenta} className='btn btn-success'>Registrar</button>
              }
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Fecha de Venta</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventasList.map((val) => {
                    const usuario = usuarios.find((c) => c.id === val.IdUsuario);
                    return (
                        <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{usuario ? usuario.username : 'N/A'}</td>
                    <td>{val.fechaVenta}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                          type="button"
                          onClick={() => {
                            editVenta(val);
                          }}
                          className="btn btn-info"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteVenta(val);
                          }}
                          className="btn btn-danger"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                    )
                }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesPage;
