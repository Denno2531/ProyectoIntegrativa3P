import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function CategoryPage() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState('');
  const [editar, setEditar] = useState(false);

  const [categoriasList, setCategorias] = useState([]);

  useEffect(() => {
    showCategorias();
  }, []);

  const addCategoria = () => {
    Axios.post('http://localhost:3001/createCategorias', {
        nombreCategoria: nombre
    })
      .then(() => {
        showCategorias();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Registro Exitoso!</strong>',
          html: `<i>La categoría <strong>${nombre}</strong> fue registrada con éxito!</i>`,
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

  const updateCategoria = () => {
    Axios.put('http://localhost:3001/updateCategorias', {
      id: id,
      nombreCategoria: nombre
    })
      .then(() => {
        showCategorias();
        limpiarCampos();
        Swal.fire({
          title: '<strong>Actualización Exitosa!</strong>',
          html: `<i>La categoría <strong>${nombre}</strong> fue actualizada con éxito!</i>`,
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

  const deleteCategoria = (val) => {
    Swal.fire({
      title: '<strong>Eliminar</strong>',
      html: `<i>¿Realmente desea eliminar la categoría <strong>${val.nombreCategoria}</strong>?</i>`,
      showCancelButton: true,
      confirmButtonColor: '#3885d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla',
      icon: 'warning',
    }).then((res) => {
      if (res.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteCategorias/${val.id}`, {}).then(() => {
          showCategorias();
          limpiarCampos();
          Swal.fire({
            title: val.nombreCategoria + 'fue eliminada.',
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
    setId(0);
    setEditar(false);
  };

  const editCategoria = (val) => {
    setEditar(true);
    setId(val.id);
    setNombre(val.nombreCategoria);
  };

  const showCategorias = () => {
    Axios.get('http://localhost:3001/readCategorias').then((response) => {
      setCategorias(response.data);
      console.log(response.data);
    });
  };

  return (
    <div>
      <Navbar />
      <div className='container mt-2'>
        <div className="card text-center">
          <div className="card-header">
            Gestion de Categorías
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

            <div className="card-footer text-muted">
              {
                editar ?
                  <div>
                    <button onClick={updateCategoria} className='btn btn-warning m-2'>Actualizar</button>
                    <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                  </div>
                  : <button onClick={addCategoria} className='btn btn-success'>Registrar</button>
              }
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoriasList.map((val) => (
                  <tr key={val.id}>
                    <th scope="row">{val.id}</th>
                    <td>{val.nombreCategoria}</td>
                    <td>
                      <div className="btn-group" role="group" aria-label="Basic example">
                        <button
                          type="button"
                          onClick={() => {
                            editCategoria(val);
                          }}
                          className="btn btn-info"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteCategoria(val);
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

export default CategoryPage;
