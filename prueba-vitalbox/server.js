const express = require('express');
const mysql = require('mysql');

const app = express();

// Configurar conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dragon2000',
  database: 'prueba_vitalbox'
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) throw error;
  console.log('Conexión a la base de datos establecida');
});

// Definir rutas para listar y crear personas
app.get('/personas', (req, res) => {
  const sql = 'SELECT * FROM personas';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post('/personas', (req, res) => {
  const { nombre, tipo_identificacion, numero_identificacion, fecha_nacimiento, peso, talla } = req.body;
  const sql = `INSERT INTO personas (nombre, tipo_identificacion, numero_identificacion, fecha_nacimiento, peso, talla) 
               VALUES ('${nombre}', '${tipo_identificacion}', '${numero_identificacion}', '${fecha_nacimiento}', ${peso}, ${talla})`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.json({ message: 'Persona creada correctamente', id: result.insertId });
  });
});

// Definir ruta para obtener detalles de una persona
app.get('/personas/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM personas WHERE id = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.status(404).json({ message: 'Persona no encontrada' });
    } else {
      res.json(results[0]);
    }
  });
});

// Iniciar servidor
const port = 3306;
app.listen(port, () => {
  console.log(`Servidor iniciado en puerto ${port}`);
});

//////////////////////

