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
        allowNull: false 
    },
    createdBy:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    description:{
        type: Sequelize.TEXT,
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