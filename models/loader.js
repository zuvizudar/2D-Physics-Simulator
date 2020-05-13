const Sequelize = require('sequelize');
//const sequelize = new Sequelize('postgres://postgres:postgres@localhost/physics_simulator');
const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/physics-simulator'
);

module.exports ={
    database: sequelize,
    Sequelize: Sequelize
};