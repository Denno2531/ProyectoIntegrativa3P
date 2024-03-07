import React from 'react';
import Navbar from './Navbar';

function Home() {
  return (
    <div style={styles.container}>
      <Navbar />

      {/* Imagen a pantalla completa */}
      <div style={styles.fullScreenImage}>
        <img
          src="https://www.showmetech.com.br/wp-content/uploads//2022/04/papel-de-parede-animado-no-pc-showmetech-2-2-1920x1024.png"
          alt="Bienvenido al sistema"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Contenido principal */}
      <div style={styles.content}>
        <h2 style={styles.heading}>Productos Tecnológicos</h2>

        <div style={styles.productList}>
          {/* Aquí puedes renderizar la lista de productos */}
          {/* Ejemplo: */}
          <div style={styles.productItem}>
            <img
              src="https://www.icarito.cl/wp-content/uploads/2009/12/los-computadores.jpg"
              alt="Producto"
              style={styles.productImage}
            />
            <p style={styles.productName}>Laptop Lenovo</p>
            <p style={styles.productDescription}>Core I7 - RAM 16 GB - 512 SSD</p>
            <p style={styles.productPrice}>Precio: $900.00</p>
          </div>
          <div style={styles.productItem}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBZu9DLOa_r1J3i24jJxnKKt6xWGd8ZSsNxQ&usqp=CAU"
              alt="Producto"
              style={styles.productImage}
            />
            <p style={styles.productName}>Case Gamer</p>
            <p style={styles.productDescription}>Case ASUS TUF17</p>
            <p style={styles.productPrice}>Precio: $1200.00</p>
          </div>
          <div style={styles.productItem}>
            <img
              src="https://www.computerhope.com/jargon/m/motherboard-small.png"
              alt="Producto"
              style={styles.productImage}
            />
            <p style={styles.productName}>Mainboard</p>
            <p style={styles.productDescription}>MAINBOARD G4 AMD/INTEL</p>
            <p style={styles.productPrice}>Precio: $210.00</p>
          </div>
          <div style={styles.productItem}>
            <img
              src="https://tecnit.com.ec/wp-content/uploads/2022/08/Disco-Duro-8tb-Western-D-Sata-3.5-Red-Nas.jpg.webp"
              alt="Producto"
              style={styles.productImage}
            />
            <p style={styles.productName}>DISCO DURO DE 2 TB SSD</p>
            <p style={styles.productDescription}>Almacenamiento de estado sólido de alta velocidad</p>
            <p style={styles.productPrice}>Precio: $120.00</p>
          </div>
          <div style={styles.productItem}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFx7a_8KDHlQ9Jb1ALEyHhir8nlZkhopt3PQ&usqp=CAU"
              alt="Producto"
              style={styles.productImage}
            />
            <p style={styles.productName}>RAM 8GB</p>
            <p style={styles.productDescription}>Módulo de memoria RAM de 8GB</p>
            <p style={styles.productPrice}>Precio: $50.00</p>
          </div>
          <div style={styles.productItem}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlzmqUsHLK4qDM0VQPvyGXTZDONqRb8PGN4A&usqp=CAU"
              alt="Producto"
              style={styles.productImage}
            />
            <p style={styles.productName}>COREI5 10 GENERACION</p>
            <p style={styles.productDescription}>Procesador de rendimiento avanzado</p>
            <p style={styles.productPrice}>Precio: $200.00</p>
          </div>
          {/* Otros productos... */}
        </div>
      </div>

      {/* Footer con formulario de contacto */}
      <footer style={styles.footer}>
        <div style={styles.contactFormContainer}>
          <h3>Contacta con Nosotros</h3>
          {/* Formulario mejorado */}
          <form style={styles.contactForm}>
            {/* Campos del formulario */}
            {/* Ejemplo: */}
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" className="form-control" id="name" name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea className="form-control" id="message" name="message" rows="4" />
            </div>
            <br></br>
            {/* Botón de envío */}
            <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
          </form>
        </div>
        <br></br>
        <p>&copy; 2024 - Todos los derechos reservados - Porgramacion Integrativa</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
  },
  fullScreenImage: {
    height: '70vh',
    overflow: 'hidden',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%', // Ajusta el ancho según tus necesidades
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  productDescription: {
    fontSize: '14px',
    color: '#666',
  },
  productPrice: {
    fontSize: '16px',
    color: '#333',
    marginTop: '10px',
  },
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #ddd',
    textAlign: 'center',
  },
  contactFormContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  contactForm: {
    marginTop: '20px',
  },
};

export default Home;
