var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const Scene = require('../models/scenes');
const Object = require('../models/objects');
/* GET home page. */

/*router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});*/

router.get('/:sceneId', (req, res, next) => {
  Scene.findOne({
    where:{
      sceneId:req.params.sceneId
    },
    order: [['"updatedAt','DESC']]
  }).then((scene)=>{
    if(scene){
      Object.findAll({
        where:{SceneId:scene.sceneId},
        order:[['"ObjectId','DESC']]
      })
      .then((objects)=>{
        res.render('scene',{
          scene: scene,
          objects:objects
        });
      })
    }
    else{
      //
    }
  })
})
module.exports = router;
