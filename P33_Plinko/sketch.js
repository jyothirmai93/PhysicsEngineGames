var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies; 


var divisions =[];
var plinkos = [];

var particle;
var particles = [];

var score =0;
var count = 0;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  //creating ground
  ground = new Ground(width/2,height,width,20);

  //creating partitions or divisions
  for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-150, 10, 300));
  }
    
  //creating plinkos or dots
  for (var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {
      plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
      plinkos.push(new Plinko(j,375));
  }
    
}
 
function draw() {
  background("black");
  Engine.update(engine);

  //displaying ground
  ground.display();

  //displaying texts
  strokeWeight(4);
  fill('green')
  //textfont(Italic)
  textSize(25);
  text("Score : "+score,20,40);

  //text(mouseX + "," + mouseY, 20, 50);
  textSize(25)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);

  //divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  // Ending game
  if (gameState =="end") {
    fill('red')
    textSize(60);
    text("Game Over", 150, 250);
  }

  //displaying pinkos
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();  
  }
 
  if(particle!=null){
    particle.display();        
    if (particle.body.position.y>760){
        if (particle.body.position.x < 300) {
          score=score+500;      
          particle=null;
          if ( count>= 5) gameState ="end";                          
        }
        else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) {
          score = score + 100;
          particle=null;
          if ( count>= 5) gameState ="end";

        }
        else if (particle.body.position.x < 900 && particle.body.position.x > 601 ){
          score = score + 200;
          particle=null;
          if ( count>= 5)  gameState ="end";
        }                   
    } 
  } 

  //ending function draw
}


function mousePressed(){
  if(gameState!=="end"){
    count++;
    particle=new Particle(mouseX, 10, 10, 10); 
  }   
}