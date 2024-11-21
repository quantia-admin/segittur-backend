const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');
const xlsx = require('xlsx');
const multer = require('multer');
const {
  getAllVisitas,
  getAllPacientes,
  getAllIndicadoresMedioambientales,
  getAllEspecialidades,
  getCentrosSalud,
  addCentroSalud,
  updateCentroSalud,
  deleteCentroSalud,
  getAllCostos,
  getAllServicios,
  deleteCosto,
  deleteServicio,
  deleteEspecialidad,
  deleteIndicadorMedioambiental,
  deletePaciente,
  deleteVisita,
  insertData
} = require('./functions/db');

dotenv.config();
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// ---- SUBIDA DE EXCELS ----
app.post('/api/upload-excel', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file?.path;
    const tableName = req.query?.table;

    if (!filePath || !tableName) {
      return res.status(400).json({ message: 'Archivo o nombre de tabla no especificado.' });
    }

    const workbook = xlsx.readFile(filePath);
    const sheetName = 'Plantilla de Inserción';
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
      return res.status(400).json({ message: 'La hoja de inserción no existe en el archivo.' });
    }

    const data = xlsx.utils.sheet_to_json(sheet);

    try {
      const result = await insertData(db, tableName, data);
      res.status(200).json(result);
    } catch (dbError) {
      console.error('Error al insertar datos:', dbError);

      // Combina el mensaje y los detalles en un único campo `message`
      res.status(500).json({
        message: `Error al insertar los datos. Detalles: ${
          dbError.sqlMessage || dbError.message || 'No se proporcionaron detalles del error.'
        }`,
      });
    }
  } catch (error) {
    console.error('Error general al procesar el archivo:', error);

    // Combina el mensaje y los detalles en un único campo `message`
    res.status(500).json({
      message: `Error al procesar el archivo. Detalles: ${
        error.message || 'No se proporcionaron detalles del error.'
      }`,
    });
  }
});


// ---- CENTROS SALUD ----
app.get('/api/centros_de_salud', (req, res) => {
  getCentrosSalud(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.post('/api/centros_de_salud', (req, res) => {
  addCentroSalud(db, req.body)
    .then(newCentro => res.status(201).json(newCentro))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al insertar el centro de salud');
    });
});

app.put('/api/centros_de_salud/:id', (req, res) => {
  const centro_id = req.params.id;
  updateCentroSalud(db, centro_id, req.body)
    .then(result => {
      if (result.affectedRows > 0) {
        res.status(200).send('Centro de salud actualizado exitosamente');
      } else {
        res.status(404).send('Centro de salud no encontrado');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al actualizar el centro de salud');
    });
});

app.delete('/api/centros_de_salud/:id', (req, res) => {
  const id = req.params.id;
  deleteCentroSalud(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Centro de salud no encontrado');
      } else {
        res.status(200).send('Centro de salud eliminado exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar el centro de salud');
    });
});

// ---- COSTOS ----
app.get('/api/costos', (req, res) => {
  getAllCostos(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.delete('/api/costos/:id', (req, res) => {
  const id = req.params.id;
  deleteCosto(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Costo no encontrado');
      } else {
        res.status(200).send('Costo eliminado exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar el costo');
    });
});

// ---- SERVICIOS ----
app.get('/api/servicios', (req, res) => {
  getAllServicios(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.delete('/api/servicios/:id', (req, res) => {
  const id = req.params.id;
  deleteServicio(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Servicio no encontrado');
      } else {
        res.status(200).send('Servicio eliminado exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar el servicio');
    });
});

// ---- ESPECIALIDADES ----
app.get('/api/especialidades', (req, res) => {
  getAllEspecialidades(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.delete('/api/especialidades/:id', (req, res) => {
  const id = req.params.id;
  deleteEspecialidad(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Especialidad no encontrada');
      } else {
        res.status(200).send('Especialidad eliminada exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar la especialidad');
    });
});

// ---- INDICADORES MEDIOAMBIENTALES ----
app.get('/api/indicadores-medioambientales', (req, res) => {
  getAllIndicadoresMedioambientales(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.delete('/api/indicadores-medioambientales/:id', (req, res) => {
  const id = req.params.id;
  deleteIndicadorMedioambiental(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Indicador no encontrado');
      } else {
        res.status(200).send('Indicador eliminado exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar el indicador');
    });
});

// ---- PACIENTES ----
app.get('/api/pacientes', (req, res) => {
  getAllPacientes(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.delete('/api/pacientes/:id', (req, res) => {
  const id = req.params.id;
  deletePaciente(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Paciente no encontrado');
      } else {
        res.status(200).send('Paciente eliminado exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar el paciente');
    });
});

// ---- VISITAS ----
app.get('/api/visitas', (req, res) => {
  getAllVisitas(db)
    .then(results => res.json(results))
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al obtener los datos');
    });
});

app.delete('/api/visitas/:id', (req, res) => {
  const id = req.params.id;
  deleteVisita(db, id)
    .then(result => {
      if (result.affectedRows === 0) {
        res.status(404).send('Visita no encontrada');
      } else {
        res.status(200).send('Visita eliminada exitosamente');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error al eliminar la visita');
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
