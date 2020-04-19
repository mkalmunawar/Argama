const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');

// class user
class User extends Sequelize.Model { }

// initialitation, create user table
User.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        birthday: Sequelize.DATE,
        gender: Sequelize.STRING,
        address: Sequelize.TEXT,
    },
    {
        sequelize, modelName: 'user'
    });

module.exports = User;