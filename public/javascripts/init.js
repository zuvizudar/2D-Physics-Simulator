
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Render = Matter.Render;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Events = Matter.Events;
var Composites = Matter.Composites;

// 全てのオブジェクトの配列
var objects =[];

// Matter.js エンジン作成
var engine = Engine.create();
var width = 700,
    height = 500;
var standardRad = width/20,
    standardSide = width/10;

prev1 ={id:0,offset:{x:0,y:0}}; //TODO id初期値
prev2 ={id:0,offset:{x:0,y:0}};
var render = Render.create({
  element: document.getElementById("canvas"),
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false
  }
});

//マウス
var mousedrag = MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
    constraint: {
      stiffness: 1,
      render: {
        visible: false
      }
    }
  });
  mousedrag.collisionFilter={
    'group':1,
    'category':1,
    'mask':2,
  }
  World.add(engine.world, mousedrag);
  render.mouse = mousedrag

  Render.run(render);

  engine.world.gravity.y = 0;
  var fps = 30;
  (function run() {
    window.requestAnimationFrame(run);
    Engine.update(engine);
  })();
  