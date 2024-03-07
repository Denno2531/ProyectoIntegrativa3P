const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Conexion a la base de datos.
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123",
    database:"componentesbd"
});

// Testing Server Function
app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})

/* -------------------------------------CRUD CLIENTES---------------------------------------- */
// Create
app.post("/createClientes",(req,res)=>{
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion;

    db.query('INSERT INTO clientes(nombreCliente,telefonoCliente,correoCliente,direccionCliente) VALUES(?,?,?,?)',[nombre,telefono,correo,direccion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente registrado con exito!");
        }
    }
    );
});

// Read
app.get("/readClientes",(req,res)=>{
    db.query('SELECT * FROM clientes',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// Update
app.put("/updateClientes",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion;

    db.query('UPDATE clientes SET nombreCliente=?,telefonoCliente=?,correoCliente=?,direccionCliente=? WHERE id=?',
    [nombre,telefono,correo,direccion,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente actualizado con exito!");
        }
    }
    );
});

// Delete
app.delete("/deleteClientes/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM clientes WHERE id=?',
    [id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Cliente eliminado con exito!");
        }
    }
    );
});

/* -------------------------------------CRUD PRODUCTOS---------------------------------------- */

// Create
app.post("/createProductos", (req, res) => {
    const { nombreProducto, descripcionProducto, precioProducto, cantidadStock, idCategoria, idProveedor } = req.body;
  
    db.query(
      'INSERT INTO productos (nombreProducto, descripcionProducto, precioProducto, cantidadStock, idCategoria, idProveedor) VALUES (?, ?, ?, ?, ?, ?)',
      [nombreProducto, descripcionProducto, precioProducto, cantidadStock, idCategoria, idProveedor],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar el producto.");
        } else {
          res.status(200).send("Producto registrado con éxito!");
        }
      }
    );
});
  
// Read
app.get("/readProductos", (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los productos.");
      } else {
        res.status(200).json(result);
      }
    });
});
  
// Update
app.put("/updateProductos", (req, res) => {
    const { id, nombreProducto, descripcionProducto, precioProducto, cantidadStock, idCategoria, idProveedor } = req.body;
  
    db.query(
      'UPDATE productos SET nombreProducto=?, descripcionProducto=?, precioProducto=?, cantidadStock=?, idCategoria=?, idProveedor=? WHERE id=?',
      [nombreProducto, descripcionProducto, precioProducto, cantidadStock, idCategoria, idProveedor, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar el producto.");
        } else {
          res.status(200).send("Producto actualizado con éxito!");
        }
      }
    );
});
  
// Delete
app.delete("/deleteProductos/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM productos WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el producto.");
      } else {
        res.status(200).send("Producto eliminado con éxito!");
      }
    });
});
  

/* -------------------------------------CRUD CATEGORIAS---------------------------------------- */

// Create
app.post("/createCategorias", (req, res) => {
    const { nombreCategoria } = req.body;
  
    db.query(
      'INSERT INTO categorias (nombreCategoria) VALUES (?)',
      [nombreCategoria],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar la categoría.");
        } else {
          res.status(200).send("Categoría registrada con éxito!");
        }
      }
    );
});
  
// Read
app.get("/readCategorias", (req, res) => {
    db.query('SELECT * FROM categorias', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener las categorías.");
      } else {
        res.status(200).json(result);
      }
    });
});
  
// Update
app.put("/updateCategorias", (req, res) => {
    const { id, nombreCategoria } = req.body;
  
    db.query(
      'UPDATE categorias SET nombreCategoria=? WHERE id=?',
      [nombreCategoria, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar la categoría.");
        } else {
          res.status(200).send("Categoría actualizada con éxito!");
        }
      }
    );
});
  
// Delete
app.delete("/deleteCategorias/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM categorias WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar la categoría.");
      } else {
        res.status(200).send("Categoría eliminada con éxito!");
      }
    });
});

/* -------------------------------------CRUD DETALLES_PEDIDOS---------------------------------------- */

// Create
app.post("/createDetallesPedidos", (req, res) => {
    const { idPedido, idProducto, cantidad, precioUnitario } = req.body;
  
    db.query(
      'INSERT INTO detalles_pedidos (idPedido, idProducto, cantidad, precioUnitario) VALUES (?, ?, ?, ?)',
      [idPedido, idProducto, cantidad, precioUnitario],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar el detalle del pedido.");
        } else {
          res.status(200).send("Detalle del pedido registrado con éxito!");
        }
      }
    );
  });
  
  // Read
  app.get("/readDetallesPedidos", (req, res) => {
    db.query('SELECT * FROM detalles_pedidos', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los detalles de los pedidos.");
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Update
  app.put("/updateDetallesPedidos", (req, res) => {
    const { id, idPedido, idProducto, cantidad, precioUnitario } = req.body;
  
    db.query(
      'UPDATE detalles_pedidos SET idPedido=?, idProducto=?, cantidad=?, precioUnitario=? WHERE id=?',
      [idPedido, idProducto, cantidad, precioUnitario, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar el detalle del pedido.");
        } else {
          res.status(200).send("Detalle del pedido actualizado con éxito!");
        }
      }
    );
  });
  
  // Delete
  app.delete("/deleteDetallesPedidos/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM detalles_pedidos WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el detalle del pedido.");
      } else {
        res.status(200).send("Detalle del pedido eliminado con éxito!");
      }
    });
  });

/* -------------------------------------CRUD PEDIDOS---------------------------------------- */

// Create
app.post("/createPedidos", (req, res) => {
    const { idCliente, fechaPedido } = req.body;
  
    db.query(
      'INSERT INTO pedidos (idCliente, fechaPedido) VALUES (?, ?)',
      [idCliente, fechaPedido],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar el pedido.");
        } else {
          res.status(200).send("Pedido registrado con éxito!");
        }
      }
    );
  });
  
  // Read
  app.get("/readPedidos", (req, res) => {
    db.query('SELECT * FROM pedidos', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los pedidos.");
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Update
  app.put("/updatePedidos", (req, res) => {
    const { id, idCliente, fechaPedido } = req.body;
  
    db.query(
      'UPDATE pedidos SET idCliente=?, fechaPedido=? WHERE id=?',
      [idCliente, fechaPedido, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar el pedido.");
        } else {
          res.status(200).send("Pedido actualizado con éxito!");
        }
      }
    );
  });
  
  // Delete
  app.delete("/deletePedidos/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM pedidos WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el pedido.");
      } else {
        res.status(200).send("Pedido eliminado con éxito!");
      }
    });
  });

  /* -------------------------------------CRUD PROVEEDORES---------------------------------------- */

// Create
app.post("/createProveedores", (req, res) => {
    const { nombreProveedor, telefonoProveedor, correoProveedor, direccionProveedor } = req.body;
  
    db.query(
      'INSERT INTO proveedores (nombreProveedor, telefonoProveedor, correoProveedor, direccionProveedor) VALUES (?, ?, ?, ?)',
      [nombreProveedor, telefonoProveedor, correoProveedor, direccionProveedor],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar el proveedor.");
        } else {
          res.status(200).send("Proveedor registrado con éxito!");
        }
      }
    );
  });
  
  // Read
  app.get("/readProveedores", (req, res) => {
    db.query('SELECT * FROM proveedores', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los proveedores.");
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Update
  app.put("/updateProveedores", (req, res) => {
    const { id, nombreProveedor, telefonoProveedor, correoProveedor, direccionProveedor } = req.body;
  
    db.query(
      'UPDATE proveedores SET nombreProveedor=?, telefonoProveedor=?, correoProveedor=?, direccionProveedor=? WHERE id=?',
      [nombreProveedor, telefonoProveedor, correoProveedor, direccionProveedor, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar el proveedor.");
        } else {
          res.status(200).send("Proveedor actualizado con éxito!");
        }
      }
    );
  });
  
  // Delete
  app.delete("/deleteProveedores/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM proveedores WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el proveedor.");
      } else {
        res.status(200).send("Proveedor eliminado con éxito!");
      }
    });
  });

  /* -------------------------------------CRUD USUARIOS---------------------------------------- */

// Create
app.post("/createUsuarios", (req, res) => {
    const { username, password, role } = req.body;
  
    db.query(
      'INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)',
      [username, password, role],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar el usuario.");
        } else {
          res.status(200).send("Usuario registrado con éxito!");
        }
      }
    );
  });
  
  // Read
  app.get("/readUsuarios", (req, res) => {
    db.query('SELECT * FROM usuarios', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener los usuarios.");
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Update
  app.put("/updateUsuarios", (req, res) => {
    const { id, username, password, role } = req.body;
  
    db.query(
      'UPDATE usuarios SET username=?, password=?, role=? WHERE id=?',
      [username, password, role, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar el usuario.");
        } else {
          res.status(200).send("Usuario actualizado con éxito!");
        }
      }
    );
  });
  
  // Delete
  app.delete("/deleteUsuarios/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM usuarios WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar el usuario.");
      } else {
        res.status(200).send("Usuario eliminado con éxito!");
      }
    });
  });
  
  /* -------------------------------------CRUD VENTAS---------------------------------------- */
  
  // Create
  app.post("/createVentas", (req, res) => {
    const { IdUsuario, fechaVenta } = req.body;
    // Convertir la fecha a formato "yyyy-MM-dd"
    const formattedFechaVenta = new Date(fechaVenta).toISOString().split('T')[0];
  
    db.query(
      'INSERT INTO ventas (IdUsuario, fechaVenta) VALUES (?, ?)',
      [IdUsuario, fechaVenta],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al registrar la venta.");
        } else {
          res.status(200).send("Venta registrada con éxito!");
        }
      }
    );
  });
  
  // Read
  app.get("/readVentas", (req, res) => {
    db.query('SELECT * FROM ventas', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al obtener las ventas.");
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Update
  app.put("/updateVentas", (req, res) => {
    const { id, IdUsuario, fechaVenta } = req.body;
  
    db.query(
      'UPDATE ventas SET IdUsuario=?, fechaVenta=? WHERE id=?',
      [IdUsuario, fechaVenta, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error al actualizar la venta.");
        } else {
          res.status(200).send("Venta actualizada con éxito!");
        }
      }
    );
  });
  
  // Delete
  app.delete("/deleteVentas/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM ventas WHERE id=?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error al eliminar la venta.");
      } else {
        res.status(200).send("Venta eliminada con éxito!");
      }
    });
  });
  
  const validCredentials = async (username, password, connection) => {
    try {
      const [rows] = await connection.execute('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password]);
  
      return rows.length > 0; // Devuelve true si se encuentra al menos un usuario con las credenciales proporcionadas
    } catch (error) {
      console.error('Error al verificar las credenciales:', error);
      return false;
    }
  };
    

// Endpoint para manejar el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales utilizando la función validCredentials
  if (validCredentials(username, password)) {
    res.json({ success: true, message: 'Inicio de sesión exitoso' });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
  }
});

  
