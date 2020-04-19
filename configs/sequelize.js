//import class sequelize
const Sequelize = require('sequelize');

//db Driver MYSQL
const sequelize = new Sequelize('argama', 'root', '',
    {
        host: 'localhost',
        dialect: 'mysql'
    });

    module.exports = sequelize;