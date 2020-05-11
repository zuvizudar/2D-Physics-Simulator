var express = require('express');
var router = express.Router();
const Scene = require('../models/scenes');
const Object = require('../models/objects');

router.post('/:sceneId', (req, res, next) =>{
  Scene.findOne({
    where:{
      sceneId:req.body.sceneId
    },
    order: [['"updatedAt','DESC']]
  }).then((scene)=>{
    if(scene.data1){
      Object.findAll({
        where:{SceneId:scene.sceneId},
        order:[['"ObjectId','ASC']]
      })
      .then((objects)=>{
        res.json({status:'OK',objects:objects});
      })
    }
    else{
      res.json({stataus:'OK',objects:null});
    }
  });
})
module.exports = router;