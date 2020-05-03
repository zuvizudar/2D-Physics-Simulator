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
    },
    Color:{
        type:Sequelize.STRING,
        allowNull: false
    }
    }
    ,{
        freezeTableName: true,
        timestamps: false 
    }
);

module.exports = Object;