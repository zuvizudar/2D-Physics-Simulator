const loader = require('./loader.js');
const Sequelize = loader.Sequelize;

const Object = loader.database.define('objects',{
    SceneId:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false 
    },
    ObjectType:{
        type:Sequelize.INTEGER, //ball,rec
        allowNull: false 
    },
    X:{
        type:Sequelize.FLOAT, 
        allowNull: false
    },
    Y:{
        type: Sequelize.FLOAT,
        allowNull: true 
    },
    Width:{
        type: Sequelize.FLOAT,
        allowNull: true 
    },
    Height:{
        type: Sequelize.FLOAT,
        allowNull: true 
    },
    Rad:{
        type:Sequelize.FLOAT,
        allowNull: true
    }
    }
    ,{
        freezeTableName: true,
        timestamps: false 
    }
);

module.exports = Object;