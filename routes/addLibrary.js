var express = require('express');
var router = express.Router();
var validate = require('uuid-validate');
const Scene = require('../models/scenes');
const Object = require('../models/objects');

router.post('/:sceneId', (req, res, next) =>{
  if(!validate(req.body.sceneId)){
    res.json({status:'error',message:"無効なIDです"});
    return;
  }
  Scene.findOne({
    where:{
      sceneId:req.body.sceneId
    },
    order: [['"updatedAt','DESC']]
  }).then((scene)=>{
    if(scene.allowLib){
      Object.findAll({
        where:{SceneId:scene.sceneId},
        order:[['"ObjectId','ASC']]
      })
      .then((objects)=>{
        res.json({status:'OK',objects:objects});
      })
    }
    else{
      res.json({stataus:'error',message:"このライブラリは使用が許可されていません"});
    }
  });
})
module.exports = router;