const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost/physics_simulator');


module.exports ={
    database: sequelize,
    Sequelize: Sequelize
};