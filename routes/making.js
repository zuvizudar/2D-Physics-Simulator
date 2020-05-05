var express = require('express');
var router = express.Router();
const uuid = require('uuid');
const Scene = require('../models/scenes');
const Object = require('../models/objects');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var test = 100;
    res.render('making',{test});
});

module.exports = router;

router.post('/save', (req, res, next) =>{
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
 
 
 function createObjectsAndRedirect(obj_json,sceneId,res){
   const obj_bulk = obj_json.data.map((c)=>{
     return{
       SceneId: sceneId,
       ObjectType: c.type,
       X: c.x ,
       Y: c.y,
       Color: c.color,
       isStatic: c.isStatic,
       Angle:c.angle,
       Density:c.density,
       Restitution:c.restitution,
       Data1: c.data1,
       Data2: c.data2,
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