const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');
const kost = require('./kost');

// class photo
class photo extends Sequelize.Model { }

// initialitation, create user table
photo.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img: Sequelize.STRING,
    },
    {
        sequelize, modelName: 'post'
    });

module.exports = post;

photo.belongsTo(kost);