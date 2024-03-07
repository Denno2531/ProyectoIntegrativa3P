import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function OrderPage() {
  const [id, setId] = useState(0);
  const [idCliente, setIdCliente] = useState(0);
  const [fechaPedido, setFechaPedido] = useState('');
  const [editar, setEditar] = useState(false);

  const [pedidosList, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    showPedidos();
    showCliente();
  }, []);

  const addPedido = () => {
    Axios.post('http://localhost:3001/createPedidos', {
      idCliente: idCliente,
      fechaPedido: fechaPedido,
    })
      .then(() => {
        showPedidos();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>El pedido fue registrado con éxito!</i>`,
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

  const updatePedido = () => {
    Axios.put('http://localhost:3001/updatePedidos', {
      id: id,
      idCliente: idCliente,
      fechaPedido: fechaPedido,
    })
      .then(() => {
        showPedidos();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>El pedido fue actualizado con éxito!</i>`,
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

  const deletePedido = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar el pedido?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deletePedidos/${val.id}`, {}).then(() => {
          showPedidos();
          limpiarCampos();
          Swal.fire({
            title: `Pedido fue eliminado.`,
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
    setIdCliente(0);
    setFechaPedido('');
    setId(0);
    setEditar(false);
  };

  const editPedido = (val) => {
    setEditar(true);
    setId(val.id);
    setIdCliente(val.idCliente);
    setFechaPedido(val.fechaPedido);
  };

  const showPedidos = () => {
    Axios.get('http://localhost:3001/readPedidos').then((response) => {
      setPedidos(response.data);
      console.log(response.data);
    });
  };

  const showCliente = () => {
    Axios.get('http://localhost:3001/readClientes').then((response) => {
      setClientes(response.data);
      console.log(response.data);
    });
  };

  return (
    <div>
      <Navbar />
      <div className='container mt-2'>
        <div className="card text-center">
          <div className="card-header">
            Gestion de Pedidos
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="clienteSelect">Cliente:</label>
              </div>
                <select
                    className="custom-select"
                    id="proveedorSelect"
                    onChange={(event) => setIdCliente(event.target.value)}
                    value={idCliente}
                    >
                    <option value="0">Seleccione un Cliente</option>
                    {
                        clientes.map((cliente) => {
                            return <option key={cliente.id} value={cliente.id}>{cliente.nombreCliente}</option>
                        })
                    }
                </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Fecha del Pedido:</span>
              </div>
              <input
                type="date"
                onChange={(event) => setFechaPedido(event.target.value)}
                className="form-control"
                value={fechaPedido}
                aria-label="Fecha del Pedido"
                aria-describedby="basic-addon2"
              />
            </div>

            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button onClick={updatePedido} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                  </div>
                  : <button onClick={addPedido} className='btn btn-success'>Registrar</button>
              }
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha del Pedido</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
              {pedidosList.map((val) => {
                    const cliente = clientes.find((c) => c.id === val.idCliente);

                    return (
                    <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{cliente ? cliente.nombreCliente : 'N/A'}</td>
                        <td>{val.fechaPedido}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                            type="button"
                            onClick={() => {
                                editPedido(val);
                            }}
                            className="btn btn-info"
                            >
                            Editar
                            </button>
                            <button
                            type="button"
                            onClick={() => {
                                deletePedido(val);
                            }}
                            className="btn btn-danger"
                            >
                            Eliminar
                            </button>
                        </div>
                        </td>
                    </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
