const loader = require('./loader.js');
const Sequelize = loader.Sequelize;

const Object = loader.database.define('objects',{
    ObjectId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    SceneId:{
        type: Sequelize.UUID,
        allowNull: false 
    },
    ObjectType:{
        type:Sequelize.STRING, 
        allowNull: false 
    },
    X:{
        type:Sequelize.FLOAT, 
        allowNull: false
    },
    Y:{
        type: Sequelize.FLOAT,
        allowNull: false  
    },
    Color:{
        type:Sequelize.STRING,
        allowNull: false
    },
    isStatic:{
        type: Sequelize.BOOLEAN,
        allowNull: true 
    },
    Angle:{
        type: Sequelize.FLOAT,
        allowNull: false  
    },
    Density:{
        type: Sequelize.FLOAT,
        allowNull: false 
    },
    Restitution:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    Data1:{
        type: Sequelize.FLOAT,
        allowNull: true 
    },
    Data2:{
        type:Sequelize.FLOAT,
        allowNull: true
    },
    Data3:{
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