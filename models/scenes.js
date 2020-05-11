const loader = require('./loader.js');
const Sequelize = loader.Sequelize;

const Scene = loader.database.define('scenes',{
    sceneId:{
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false 
    },
    sceneName:{
        type:Sequelize.STRING,
        allowNull: true 
    },
    createdBy:{
        type: Sequelize.STRING,
        allowNull: true 
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    data1:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    updatedAt:{
        type: Sequelize.DATE,
        allowNull: false
    }}
    ,{
        freezeTableName: true,
        timestamps: false ,
        indexes: [
            {
              fields: ['createdBy']
            }
          ]
    }
);

module.exports = Scene;