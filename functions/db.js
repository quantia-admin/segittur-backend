// ---- IMPORTACIONES ----
const mysql = require('mysql2');

// ---- CENTROS SALUD ----

function getCentrosSalud(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM centro';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

function addCentroSalud(db, centro) {
    return new Promise((resolve, reject) => {
        const { nombre, ubicacion_id, tipo, fecha_apertura, region_id, tipo_turismo_id } = centro;
        const query = `
            INSERT INTO centros_de_salud 
            (nombre, ubicacion_id, tipo, fecha_apertura, region_id, tipo_turismo_id) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [nombre, ubicacion_id, tipo, fecha_apertura, region_id, tipo_turismo_id];
        db.query(query, values, (err, result) => {
            if (err) {
                reject('Error al insertar el centro de salud: ' + err);
            } else {
                resolve({ id: result.insertId, ...centro });
            }
        });
    });
}

function updateCentroSalud(db, centro_id, updatedCentro) {
    return new Promise((resolve, reject) => {
        const { nombre, ubicacion_id, tipo, fecha_apertura, region_id, tipo_turismo_id } = updatedCentro;
        const query = `
            UPDATE centros_de_salud 
            SET nombre = ?, ubicacion_id = ?, tipo = ?, fecha_apertura = ?, region_id = ?, tipo_turismo_id = ? 
            WHERE centro_id = ?`;
        const values = [nombre, ubicacion_id, tipo, fecha_apertura, region_id, tipo_turismo_id, centro_id];
        db.query(query, values, (err, result) => {
            if (err) {
                reject('Error al actualizar el centro de salud: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

function deleteCentroSalud(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM centro WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar el centro de salud: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// ---- COSTOS ----

// Obtener todos los costos
function getAllCostos(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM costos';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta de costos: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

// Eliminar un costo
function deleteCosto(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM costos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar el costo: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// ---- SERVICIOS ----

// Obtener todos los servicios
function getAllServicios(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM servicio';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta de servicios: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

// Eliminar un servicio
function deleteServicio(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM servicio WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar el servicio: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// ---- ESPECIALIDADES ----

// Obtener todas las especialidades
function getAllEspecialidades(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM especialidad';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta de especialidades: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

// Eliminar una especialidad
function deleteEspecialidad(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM especialidad WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar la especialidad: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// ---- INDICADORES MEDIOAMBIENTALES ----

// Obtener todos los indicadores medioambientales
function getAllIndicadoresMedioambientales(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM indicador_medioambiental';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta de indicadores medioambientales: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

// Eliminar un indicador medioambiental
function deleteIndicadorMedioambiental(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM indicador_medioambiental WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar el indicador medioambiental: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// ---- PACIENTES ----

// Obtener todos los pacientes
function getAllPacientes(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM paciente';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta de pacientes: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

// Eliminar un paciente
function deletePaciente(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM paciente WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar el paciente: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// ---- VISITAS ----

// Obtener todas las visitas
function getAllVisitas(db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM visita';
        db.query(query, (err, results) => {
            if (err) {
                reject('Error al realizar la consulta de visitas: ' + err);
            } else {
                resolve(results);
            }
        });
    });
}

// Eliminar una visita
function deleteVisita(db, id) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM visita WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                reject('Error al eliminar la visita: ' + err);
            } else {
                resolve(result);
            }
        });
    });
}

// Función genérica para insertar datos en cualquier tabla
function insertData(db, tableName, data) {
    return new Promise((resolve, reject) => {
      try {
        if (!data || data.length === 0) {
          return reject(new Error('No hay datos para insertar.'));
        }
  
        const columns = Object.keys(data[0]);
        const placeholders = columns.map(() => '?').join(',');
        const insertQuery = `INSERT INTO ${tableName} (${columns.join(',')}) VALUES (${placeholders})`;
  
        const queries = data.map((row) => {
          return new Promise((innerResolve, innerReject) => {
            const values = columns.map((col) => {
              const value = row[col];
              return value === undefined || value === '' ? null : value;
            });
  
            db.query(insertQuery, values, (err) => {
              if (err) {
                console.error('Error al insertar los datos:', err);
                return innerReject(err); // Devuelve el error completo
              }
              innerResolve();
            });
          });
        });
  
        Promise.all(queries)
          .then(() => {
            resolve({ message: 'Datos insertados exitosamente.' });
          })
          .catch((err) => {
            reject(err); // No construyas un nuevo error, pasa el original
          });
      } catch (error) {
        console.error('Error al procesar los datos:', error);
        reject(error);
      }
    });
  }
module.exports = {
    getCentrosSalud, addCentroSalud, updateCentroSalud, deleteCentroSalud,
    getAllCostos, deleteCosto,
    getAllServicios, deleteServicio,
    getAllEspecialidades, deleteEspecialidad,
    getAllIndicadoresMedioambientales, deleteIndicadorMedioambiental,
    getAllPacientes, deletePaciente,
    getAllVisitas, deleteVisita, insertData
};
