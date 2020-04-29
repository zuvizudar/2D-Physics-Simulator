

    var Engine = Matter.Engine;
    var World = Matter.World;
    var Bodies = Matter.Bodies;
    var MouseConstraint = Matter.MouseConstraint;

    // Matter.js エンジン作成
    var engine = Engine.create(document.body);
    
    // 二つの箱(四角)と地面を作る
    var boxA = Bodies.rectangle(400, 200, 80, 80);//x,y,width,height,[option]
    var circleA = Bodies.circle(450, 50, 30);//x,y,rad
    
    // isStatic:静的(完全固定)
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    reduce_friction(circleA,0.001)
    var objects =[];
    objects.push(boxA,circleA,ground)
    
    World.add(engine.world, objects);
  //  engine.world.gravity.y = 0;
    var mousedrag = MouseConstraint.create(engine);
    World.add(engine.world,mousedrag);
    function start_simulation(){
        engine.world.grabity.y = 1;
    }
    function reduce_friction(obj,rate){
        obj.friction = rate;
        obj.frictionAir = rate;
     //   obj.restitution = 1-rate;
    }
    Engine.run(engine);
    