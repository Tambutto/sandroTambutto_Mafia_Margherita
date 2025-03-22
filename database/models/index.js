'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// // Conectar con Sequelize
// const { sequelize } = require('./models'); // Asegúrate de que 'models/index.js' exporte el objeto sequelize

// sequelize.authenticate()
//   .then(() => console.log('Conexión establecida correctamente con la base de datos'))
//   .catch((error) => console.error('No se pudo conectar con la base de datos:', error));

// // Sincronizar modelos con la base de datos
// sequelize.sync()
//   .then(() => console.log('Modelos sincronizados con la base de datos'))
//   .catch((error) => console.error('Error al sincronizar los modelos:', error));


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
