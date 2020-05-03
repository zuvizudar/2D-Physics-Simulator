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

function createObjectsAndRedirect(obj_json,sceneIdj,res){
  
 /* Object.bulkCreate(obj_json).then(()=>{
    res.redirect('/');
  })*/
}
module.exports = router;
