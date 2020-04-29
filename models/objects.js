const loader = require('./loader.js');
const Sequelize = loader.Sequelize;

const Object = loader.database.define('objects',{
    SceneId:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false 
    },
    ObjectType:{
        type:Sequelize.INTEGER,
        allowNull: false 
    },
    Size:{
        type:Sequelize.FLOAT,
        allowNull: false
    },
    X:{
        type:Sequelize.FLOAT,
        allowNull: false 
    },
    Y:{
        type:Sequelize.FLOAT,
        allowNull: false 
    }}
    ,{
        freezeTableName: true,
        timestamps: false 
    }
);

module.exports = Object;