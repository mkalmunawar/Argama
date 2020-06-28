const Sequelize = require('sequelize');
const sequelize = require('../configs/sequelize');
const User = require('./User');

// class user
class post extends Sequelize.Model { }

// initialitation, create user table
post.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
    },
    {
        sequelize, modelName: 'post'
    });

module.exports = post;

post.belongsTo(User);