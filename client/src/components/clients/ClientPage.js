// ClientPage.js
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';

function ClientPage() {

    const [id,setId] = useState(0);
    const [nombre,setNombre] = useState("");
    const [telefono,setTelefono] = useState(0);
    const [correo,setCorreo] = useState("");
    const [direccion,setDireccion] = useState("");
    const [editar,setEditar] = useState(false);

    const [clientesList,setClientes] = useState([]);

    const addCliente = ()=>{
        Axios.post("http://localhost:3001/createClientes",{
        nombre:nombre,
        telefono:telefono,
        correo:correo,
        direccion:direccion
        }).then(()=>{
        showCliente();
        limpiarCampos();
        Swal.fire({
            title: '<strong>Registro Exitoso!</strong>',
            html: '<i>El cliente <strong>' + nombre + '</strong> fue registrado con exito!</i>',
            icon: 'success',
            timer: 3000
        })
        }).catch(function(error){
        Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: JSON.parse(JSON.stringify(error)).message
        })
        });
    }

    const updateCliente = ()=>{
        Axios.put("http://localhost:3001/updateClientes",{
        id:id,
        nombre:nombre,
        telefono:telefono,
        correo:correo,
        direccion:direccion
        }).then(()=>{
        showCliente();
        limpiarCampos();
        Swal.fire({
            title: '<strong>Actualizacion Exitosa!</strong>',
            html: '<i>El cliente <strong>' + nombre + '</strong> fue actualizado con exito!</i>',
            icon: 'success',
            timer: 3000
        })
        }).catch(function(error){
        Swal.fire({
            icon: 'error',
            title: 'Ooops..',
            text: JSON.parse(JSON.stringify(error)).message
        })
        });
    }

    const deleteCliente = (val)=>{
        Swal.fire({
        title: '<strong>Eliminar</strong>',
        html: '<i>Realmente desea eliminar a <strong>' + val.nombreCliente + '</strong>?</i>',
        showCancelButton: true,
        confirmButtonColor: '#3885d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo',
        icon: 'warning',
        }).then(res => {
        if(res.isConfirmed){
            Axios.delete(`http://localhost:3001/deleteClientes/${val.id}`,{}).then(()=>{
                showCliente();
                limpiarCampos();
                Swal.fire({
                title: val.nombreCliente + ' fue eliminado.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
                });
            }).catch(function(error){
                Swal.fire({
                icon: 'error',
                title: 'Ooops..',
                text: JSON.parse(JSON.stringify(error)).message
                })
            });
        }
        });
    }

    const limpiarCampos = ()=>{
        setNombre("");
        setTelefono(0);
        setCorreo("");
        setDireccion("");
        setId(0);
        setEditar(false);
    }

    const editCliente = (val) => {
        setEditar(true);

        setId(val.id);
        setNombre(val.nombreCliente);
        setTelefono(val.telefonoCliente);
        setCorreo(val.correoCliente);
        setDireccion(val.direccionCliente);
    }

    const showCliente = ()=>{
        Axios.get("http://localhost:3001/readClientes").then((response)=>{
        setClientes(response.data);
        console.log(response.data);
        })
    }

    useEffect(() => {
        showCliente();
      }, []);

    return (
        <div>
            <Navbar />
            <div className='container mt-2'>
                <div className="card text-center">
                    <div className="card-header">
                    Gestion de clientes
                    </div>
                    <div className="card-body">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Nombre:</span>
                        </div>
                        <input type="text"
                        onChange={(event)=>{
                        setNombre(event.target.value);
                        }}
                        className="form-control" value={nombre} placeholder="Ingrese Nombre" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Telefono:</span>
                        </div>
                        <input type="number"
                        onChange={(event)=>{
                        setTelefono(event.target.value);
                        }}
                        className="form-control" value={telefono} placeholder="Ingrese Telefono" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Correo:</span>
                        </div>
                        <input type="email"
                        onChange={(event)=>{
                        setCorreo(event.target.value);
                        }}
                        className="form-control" value={correo} placeholder="Ingrese correo" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Direccion:</span>
                        </div>
                        <input type="text"
                        onChange={(event)=>{
                        setDireccion(event.target.value);
                        }}
                        className="form-control" value={direccion} placeholder="Ingrese Direccion" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>
                    </div>
                    <div className="card-footer text-muted">
                    {
                    editar? 
                    <div>
                        <button onClick={updateCliente} className='btn btn-warning m-2'>Actualizar</button>
                        <button onClick={limpiarCampos} className='btn btn-info m-2'>Cancelar</button>
                    </div>
                    :<button onClick={addCliente} className='btn btn-success'>Registrar</button>
                    }
                    
                    </div>
                    <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        clientesList.map((val) => {
                        return <tr>
                            <th scope="row">{val.id}</th>
                            <td>{val.nombreCliente}</td>
                            <td>{val.telefonoCliente}</td>
                            <td>{val.correoCliente}</td>
                            <td>{val.direccionCliente}</td>
                            <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button"
                                onClick={()=>{
                                editCliente(val);
                                }}
                            className="btn btn-info">Editar</button>
                            <button type="button" 
                                onClick={()=>{
                                deleteCliente(val);
                                }}
                            className="btn btn-danger">Eliminar</button>
                            </div>
                            </td>
                        </tr>
                        })
                    }
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
      );
}

export default ClientPage;