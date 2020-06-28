const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');
const post = require('./post');

// class user
class kost extends Sequelize.Model { }

// initialitation, create user table
kost.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        location: Sequelize.STRING,
        price: Sequelize.STRING,
        room_type: Sequelize.STRING,
        facilities: Sequelize.STRING,
        variety: Sequelize.STRING,
        unit: Sequelize.STRING,
    },
    {
        sequelize, modelName: 'kost'
    });

module.exports = kost;

kost.belongsTo(post);