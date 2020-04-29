var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(640,360,{
    backgroundColor: 0x00ffd4
});

document.body.appendChild(renderer.view);

var ball = new PIXI.Graphics();
ball.beginFill(0xFFFFFF,0.5);
ball.drawCircle(100,100,100);

var simulation = function(ball){
    ball.x+=0.1;
};

var animation = function(){
    requestAnimationFrame(animation);//大体1/60秒間隔
    simulation(ball);
    renderer.render(stage);
};

animation();

/*var sprGirl = new PIXI.Sprite(
    PIXI.Texture.fromImage('../images/04.png')
);*/

stage.addChild(ball);
