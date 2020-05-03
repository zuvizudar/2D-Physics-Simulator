var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const Scene = require('../models/scenes');
const Object = require('../models/objects');
/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Express' });
});*/
router.post('/', (req, res, next) =>{
   const sceneId = uuid.v4();
   const updateAt = new Date();
   
   Scene.create({
     sceneId: sceneId,
     sceneName: 'test',
     createdBy: 200,
     updatedAt: updateAt
   }).then((scene)=>{ 
     createObjectsAndRedirect(req.body,sceneId,res);
   })
});

router.get('/scene/:sceneId', (req, res, next) => {
  /*Scene.findOne({
    include:[]
  })*/
  res.render('scene',{sceneId :req.params.sceneId});
})
function createObjectsAndRedirect(obj_json,sceneId,res){
  
  const obj_bulk = obj_json.data.map((c)=>{
    return{
      SceneId: sceneId,
      ObjectType: c.type,
      X: c.x ,
      Y: c.y,
      Width: c.width,
      Height: c.height,
      Rad: c.rad,
      Color: c.color
     }
    }
  );
  //console.log(obj_bulk)
  Object.bulkCreate(obj_bulk).then(()=>{
    res.send(sceneId)
  })
  .catch(function(err){
    console.log(err);
  })
}
module.exports = router;
