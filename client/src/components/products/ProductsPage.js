import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function ProductPage() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0.0);
  const [cantidadStock, setCantidadStock] = useState(0);
  const [idCategoria, setIdCategoria] = useState(0);
  const [idProveedor, setIdProveedor] = useState(0);
  const [editar, setEditar] = useState(false);

  const [productosList, setProductos] = useState([]);
  const [proveedores, setProvedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    showProductos();
  }, []);

  const addProducto = () => {
    Axios.post('http://localhost:3001/createProductos', {
        nombreProducto: nombre,
        descripcionProducto: descripcion,
        precioProducto: precio,
        cantidadStock: cantidadStock,
        idCategoria: idCategoria,
        idProveedor: idProveedor,
    })
      .then(() => {
        showProductos();
        showCategorias();
        showProveedores();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>El producto <strong>${nombre}</strong> fue registrado con éxito!</i>`,
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

  const updateProducto = () => {
    Axios.put('http://localhost:3001/updateProductos', {
      id: id,
      nombreProducto: nombre,
        descripcionProducto: descripcion,
        precioProducto: precio,
        cantidadStock: cantidadStock,
        idCategoria: idCategoria,
        idProveedor: idProveedor,
    })
      .then(() => {
        showProductos();
        showCategorias();
        showProveedores();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>El producto <strong>${nombre}</strong> fue actualizado con éxito!</i>`,
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

  const deleteProducto = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar el producto <strong>${val.nombreProducto}</strong>?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteProductos/${val.id}`, {}).then(() => {
          showProductos();
          showCategorias();
          showProveedores();
          limpiarCampos();
          Swal.fire({
            title: `${val.nombreProducto} fue eliminado.`,
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
    setNombre('');
    setDescripcion('');
    setPrecio(0.0);
    setCantidadStock(0);
    setIdCategoria(0);
    setIdProveedor(0);
    setId(0);
    setEditar(false);
  };

  const editProducto = (val) => {
    setEditar(true);

    setId(val.id);
    setNombre(val.nombreProducto);
    setDescripcion(val.descripcionProducto);
    setPrecio(val.precioProducto);
    setCantidadStock(val.cantidadStock);
    setIdCategoria(val.idCategoria);
    setIdProveedor(val.idProveedor);
  };

  const showProductos = () => {
    Axios.get('http://localhost:3001/readProductos').then((response) => {
      setProductos(response.data);
      console.log(response.data);
    });
  };

  const showProveedores = () => {
    Axios.get('http://localhost:3001/readProveedores').then((response) => {
      setProvedores(response.data);
      console.log(response.data);
    });
  };

  const showCategorias = () => {
    Axios.get('http://localhost:3001/readCategorias').then((response) => {
      setCategorias(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    showProveedores();
    showCategorias();
    showProductos();
  }, []);
  

  return (
    <div>
        <Navbar />
        <div className='container mt-2'>
            <div className="card text-center">
            <div className="card-header">
                Gestion de productos
            </div>
            <div className="card-body">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Nombre:</span>
                    </div>
                    <input
                    type="text"
                    onChange={(event) => {
                        setNombre(event.target.value);
                    }}
                    className="form-control"
                    value={nombre}
                    placeholder="Ingrese Nombre"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">Descripción:</span>
                    </div>
                    <input
                    type="text"
                    onChange={(event) => {
                        setDescripcion(event.target.value);
                    }}
                    className="form-control"
                    value={descripcion}
                    placeholder="Ingrese Descripcion"
                    aria-label="Nombre"
                    aria-describedby="basic-addon1"
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Precio:</span>
                    </div>
                    <input
                    type="number"
                    onChange={(event) => {
                        setPrecio(event.target.value);
                    }}
                    className="form-control"
                    value={precio}
                    placeholder="Ingrese Precio"
                    aria-label="Precio"
                    aria-describedby="basic-addon3"
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon4">Cantidad en Stock:</span>
                    </div>
                    <input
                    type="number"
                    onChange={(event) => {
                        setCantidadStock(event.target.value);
                    }}
                    className="form-control"
                    value={cantidadStock}
                    placeholder="Ingrese Cantidad en Stock"
                    aria-label="Cantidad en Stock"
                    aria-describedby="basic-addon4"
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="proveedorSelect">Proveedor:</label>
                    </div>
                    <select
                    className="custom-select"
                    id="proveedorSelect"
                    onChange={(event) => setIdProveedor(event.target.value)}
                    value={idProveedor}
                    >
                    <option value="0">Seleccione un proveedor</option>
                    {
                        proveedores.map((proveedor) => {
                            return <option key={proveedor.id} value={proveedor.id}>{proveedor.nombreProveedor}</option>
                        })
                    }
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="categoriaSelect">Categoría:</label>
                    </div>
                    <select
                    className="custom-select"
                    id="categoriaSelect"
                    onChange={(event) => setIdCategoria(event.target.value)}
                    value={idCategoria}
                    >
                    <option value="0">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nombreCategoria}</option>
                    ))}
                    </select>
                </div>

            <div className="card-footer text-muted">
                {
                editar ?
                    <div>
                    <button onClick={updateProducto} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                    </div>
                    : <button onClick={addProducto} className='btn btn-success'>Registrar</button>
                }
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Proveedor</th>
                    {/* Agregar aquí los encabezados adicionales para productos */}
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productosList.map((val) => {
                    const categoria = categorias.find((c) => c.id === val.idCategoria);
                    const proveedor = proveedores.find((p) => p.id === val.idProveedor);

                    return (
                    <tr key={val.id}>
                        <th scope="row">{val.id}</th>
                        <td>{val.nombreProducto}</td>
                        <td>{val.descripcionProducto}</td>
                        <td>{val.precioProducto}</td>
                        <td>{val.cantidadStock}</td>
                        <td>{categoria ? categoria.nombreCategoria : 'N/A'}</td>
                        <td>{proveedor ? proveedor.nombreProveedor : 'N/A'}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                            type="button"
                            onClick={() => {
                                editProducto(val);
                            }}
                            className="btn btn-info"
                            >
                            Editar
                            </button>
                            <button
                            type="button"
                            onClick={() => {
                                deleteProducto(val);
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

export default ProductPage;
