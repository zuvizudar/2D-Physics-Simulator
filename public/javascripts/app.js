// Pixi領域を作成                                                                         
var renderer = PIXI.autoDetectRenderer(256, 256,{backgroundColor : 0x1099ff});            
// ドットの枠線で囲う                                                                     
renderer.view.style.border = "1px dashed black";                                          
                                                                                          
//`stage`という名前のコンテナを追加                                                       
var stage = new PIXI.Container();                                                         
                                                                                          
// 文字を表示                                                                             
var basicText = new PIXI.Text('Hello, Pixi World!');                                      
basicText.x = 20;                                                                         
basicText.y = 20;                                                                         
stage.addChild(basicText);  

// ベクターで円を表示                                                                     
var graphics = new PIXI.Graphics()                                                        
graphics.lineStyle(0);                                                                    
graphics.beginFill(0xFFFFFF, 0.5);                                                        
graphics.drawCircle(256,256,120);                                                         
graphics.endFill();                                                                       
stage.addChild(graphics)                                                                  
                                                                                          
// 円をボタン風味に                                                                       
graphics.interactive = true;                                                              
graphics.on('mousedown', onDown);                                                         
graphics.on('touchstart', onDown)                                                         
function onDown() {                                                                       
    alert("call"); 
}                                                                                         
                                                                                          
//canvasタグを自動追記                                                                    
document.body.appendChild(renderer.view)                                                  
                                                                                          
//レンダラに`stage`を描画させる                                                           
renderer.render(stage) 