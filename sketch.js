const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1, pig2;
var backgroundImg,platform;
var slingshot;
var gameState = "START";
var bg = "sprites/bg.png";
var score = 0;


function preload() {
    getBackgroundIMG();
    
}

function setup(){
    var canvas = createCanvas(1400,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1600,20);
    platform = new Ground(150, 305, 300, 200);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810,390);
    pig2 = new Pig(810, 220);
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    box5 = new Box(810,160,70,70);

    log1 = new Log(810,260,300, PI/2);
    log3 =  new Log(810,180,300, PI/2);
    //log4 = new Log(760,120,150, PI/7);
    log5 = new Log(800,120,300, PI/2);
    /*log6 = new Log(1100,170,300,PI/2);
    log7 = new Log(1100,50,300,PI/2);
    box6 = new Box(1220,320,70,70);
    box7 = new Box(1000,320,70,70);
    box8 = new Box(1000,100,70,70);
    box9 = new Box(1220,100,70,70);*/


    bird = new Bird(50,20);
    //chain = new Chain(bird.body,log6.body);
    slingshot = new SlingShot(bird.body,{x:200,y:35});


}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    fill("white");
    textSize(30);
    text("score: "+ score,width-300,50);     
    Engine.update(engine);
    console.log(box2.body.position.x);
    console.log(box2.body.position.y);
    console.log(box2.body.angle);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.score();
    //pig3.display();
    //pig4.display();
    log3.display();

    box5.display();
    //log4.display();
    log5.display();
    /*log6.display();
    log7.display();
    box6.display();
    box7.display();
    box8.display();
    box9.display();*/

    bird.display();
    platform.display();
    slingshot.display();
}
function mouseDragged() {
   //if(gameState!=="LANCADO"){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
  //} 
    
}
function mouseReleased() {
    slingshot.fly();
    gameState = "LANCADO";
}
function keyPressed(){
    if(keyCode === 32){
        slingshot.attach(bird.body);
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY});
     // gameState="START";  
    
    }
}
async function getBackgroundIMG(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var responseJson = await response.json()
    var datetime = responseJson.datetime
    var hour = datetime.slice(11,13);
    console.log(hour);
    if (hour>=06&&hour<=18) {
      bg = "sprites/bg2.jpg";  
    } else {
      bg = "sprites/bg.png";  
    }
    backgroundImg = loadImage(bg);
}