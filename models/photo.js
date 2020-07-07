const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');
const post = require('./post');

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
        cover: Sequelize.STRING,
        imgOne: Sequelize.STRING,
        imgTwo: Sequelize.STRING,
        imgThree: Sequelize.STRING,
    },
    {
        sequelize, modelName: 'photo'
    });

module.exports = photo;

photo.belongsTo(post);