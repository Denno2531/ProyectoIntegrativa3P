import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function OrderDetailsPage() {
  const [id, setId] = useState(0);
  const [idPedido, setIdPedido] = useState(0);
  const [idProducto, setIdProducto] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [precioUnitario, setPrecioUnitario] = useState(0.0);
  const [editar, setEditar] = useState(false);

  const [detallesPedidosList, setDetallesPedidos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    showDetallesPedidos();
  }, []);

  const addDetallesPedidos = () => {
    Axios.post('http://localhost:3001/createDetallesPedidos', {
      id: id,
      idProducto: idProducto,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
    })
      .then(() => {
        showDetallesPedidos();
        showPedidos();
        showProductos();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>El detalle de pedido fue registrado con éxito!</i>`,
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

  const updateDetallesPedidos = () => {
    Axios.put('http://localhost:3001/updateDetallesPedidos', {
      id: id,
      idPedido: idPedido,
      idProducto: idProducto,
      cantidad: cantidad,
      precioUnitario: precioUnitario,
    })
      .then(() => {
        showDetallesPedidos();
        showPedidos();
        showProductos();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>El detalle de pedido fue actualizado con éxito!</i>`,
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

  const deleteDetallesPedidos = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar el detalle de pedido?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteDetallesPedidos/${val.id}`, {}).then(() => {
          showDetallesPedidos();
          showPedidos();
          showProductos();
          limpiarCampos();
          Swal.fire({
            title: `Detalle de pedido fue eliminado.`,
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
    setIdPedido(0);
    setIdProducto(0);
    setCantidad(0);
    setPrecioUnitario(0.0);
    setId(0);
    setEditar(false);
  };

  const editDetallesPedidos = (val) => {
    setEditar(true);
    setId(val.id);
    setIdPedido(val.idPedido);
    setIdProducto(val.idProducto);
    setCantidad(val.cantidad);
    setPrecioUnitario(val.precioUnitario);
  };

  const showDetallesPedidos = () => {
    Axios.get('http://localhost:3001/readDetallesPedidos').then((response) => {
      setDetallesPedidos(response.data);
      console.log(response.data);
    });
  };

  const showPedidos = () => {
    Axios.get('http://localhost:3001/readPedidos').then((response) => {
      setPedidos(response.data);
      console.log(response.data);
    });
  };

  const showProductos = () => {
    Axios.get('http://localhost:3001/readProductos').then((response) => {
      setProductos(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    showPedidos();
    showProductos();
    showDetallesPedidos();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container mt-2'>
        <div className="card text-center">
          <div className="card-header">
            Gestion de Detalles de Pedidos
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="pedidoSelect">Pedido:</label>
              </div>
              <select
                className="custom-select"
                id="pedidoSelect"
                onChange={(event) => setIdPedido(event.target.value)}
                value={idPedido}
              >
                <option value="0">Seleccione un pedido</option>
                {pedidos.map((pedido) => (
                  <option key={pedido.id} value={pedido.id}>{pedido.id}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="productoSelect">Producto:</label>
              </div>
              <select
                className="custom-select"
                id="productoSelect"
                onChange={(event) => setIdProducto(event.target.value)}
                value={idProducto}
              >
                <option value="0">Seleccione un producto</option>
                {productos.map((producto) => (
                  <option key={producto.id} value={producto.id}>{producto.nombreProducto}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Cantidad:</span>
              </div>
              <input
                type="number"
                onChange={(event) => setCantidad(event.target.value)}
                className="form-control"
                value={cantidad}
                placeholder="Ingrese Cantidad"
                aria-label="Cantidad"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon2">Precio Unitario:</span>
              </div>
              <input
                type="number"
                step="0.01"
                onChange={(event) => setPrecioUnitario(event.target.value)}
                className="form-control"
                value={precioUnitario}
                placeholder="Ingrese Precio Unitario"
                aria-label="Precio Unitario"
                aria-describedby="basic-addon2"
              />
            </div>

            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button onClick={updateDetallesPedidos} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                  </div>
                  : <button onClick={addDetallesPedidos} className='btn btn-success'>Registrar</button>
              }
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Pedido</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio Unitario</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {detallesPedidosList.map((val) => {
                  const pedido = pedidos.find((p) => p.id === val.idPedido);
                  const producto = productos.find((p) => p.id === val.idProducto);

                  return (
                    <tr key={val.id}>
                      <th scope="row">{val.id}</th>
                      <td>{pedido ? pedido.id : 'N/A'}</td>
                      <td>{producto ? producto.nombreProducto : 'N/A'}</td>
                      <td>{val.cantidad}</td>
                      <td>{val.precioUnitario}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button
                            type="button"
                            onClick={() => {
                              editDetallesPedidos(val);
                            }}
                            className="btn btn-info"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteDetallesPedidos(val);
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

export default OrderDetailsPage;
