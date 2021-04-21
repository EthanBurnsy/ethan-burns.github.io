//game object artibutes
function GameObject(name, image, health, x, y) {
    this.name = name;
    this.img = image; // this can be used to hold image filename
    this.health = health;
    this.x = x; // initialised at 0 ***
    this.y = y; // initialised at 0 ***
}

// The GamerInput is an Object that holds the Current
var canvas=document.getElementById("game");
var context=canvas.getContext("2d");
var gameOver = false;

// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input
var direction = 0;
var stardirection = 0;
var buzzsawAngle = 0;

//sprites objects and images for game
var sprite= new Image();
var saw =new Image();
var star = new Image();
var start = new Image();
var end = new Image();

sprite.src="./img/blobbert.png";
saw.src="./img/buzzsaw.png";
star.src="./img/ninjastar.png";
start.src="./img/startpoint.png";
end.src="./img/endpoint.png";

// Default Player
var player = new GameObject("Player", sprite, 0, 5, 5);
var buzzsaw = new GameObject("buzzsaw", saw, 0, 600, 400);
var star = new GameObject("ninjastar", star, 0, 200, 400);
var startpoint = new GameObject("startpoint", start, 0, 0, 5);
var endpoint = new GameObject("endpoint", end, 0, 725, 730);

// Gameobjects is a collection of the Actors within the game
// this is an Array
var gameobjects = [player,buzzsaw];
var frames=6;
var currentFrame=0;

//time set
var initial = new Date().getTime();
var current;

var counter = 0;
var currentlives = 3;
var lost = false;
var won = false;

function mouseDown(){
    direction = 4;
}
function mouseUp(){
    direction = 3;
}
function mouseRight(){
    direction = 2;
}
function mouseLeft(){
    direction = 1;
}

// Process keyboard input event
function input(event) {
    // console.log("Event type: " + event.type);
    console.log("mouseDown: " + event.mouseDown);
if (gameOver=false) {
    if (event.type === "mouseDown") {
        switch (event.keyCode) {
            case 37: // Left Arrow
                gamerInput = new GamerInput("Left");
                direction =1;
                break; //Left key
            case 39: // Up Arrow
                gamerInput = new GamerInput("Right");
                direction =2;
                break; //Up key
            case 38: // Right Arrow
                gamerInput = new GamerInput("Up");
                direction =3;
                break; //Right key
            case 40: // Down Arrow
                gamerInput = new GamerInput("Down");
                direction =4;
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
}
}
function checkBorder(){
    if(player.x>=star.x - 20 && player.x<=star.x + 100)
    {
        if(player.y>=star.y - 60 && player.y<=star.y + 80)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw.x - 45 && player.x<=buzzsaw.x + 65)
    {
        if(player.y>=buzzsaw.y - 45 && player.y<=buzzsaw.y + 90)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
}
function checkLives(){
    if(currentlives>=1)
    {
         lost = false;
    }
    else {
         lost =  true;
    }
}
function checkGoal(){
    if(player.x>=endpoint.x - 20 && player.x<=endpoint.x + 20)
    {
        if(player.y>=endpoint.y - 20 && player.y<=endpoint.y + 20)
        {
            won = true;
        }
    }
}
function update() {

    checkBorder();
    checkLives();
    checkGoal();

    if (star.x > 100){
    stardirection = 1;
    }
    if(star.x < 0){
    stardirection = 0;
    }

    if(stardirection == 0)
    {
    star.x ++;
    }
    else if(stardirection == 1)
    {
    star.x--;
    }

    if (player.x > 745){
     direction = 1;
     }
    if(player.x < 0){
     direction = 2;
     }
    if (player.y > 745){
     direction = 3;
    }
    if(player.y < -15){
     direction = 4;
    }

    if(direction == 1)
    {
        player.x -=1;
    }
    if(direction == 2)
    {
        player.x += 1;
    }
    if(direction == 3)
    {
        player.y -=1;
    }
    if(direction == 4)
    {
        player.y += 1;
    }
if(gameOver==false) {
    switch (direction){
        case 0:
            player.x = player.x;
            player.y = player.y;
            break;
        case 1:
            player.x -=5;
            break;
        case 2:
            player.x +=5;
            break;
        case 3:
            player.y -=5;
            break;
        case 4:
            player.y +=5;
            break;
    }
}
}


// Modify to Draw to Screen
function draw() {

    animate();
}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// this is is being handled by the method input()
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);

function animate() {
    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames;

        initial = current; // reset initial
    } 
    buzzsawAngle += 5;

    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(startpoint.img,0,0,256,256,startpoint.x,startpoint.y,80,80);
    context.drawImage(endpoint.img,0,0,256,256,endpoint.x,endpoint.y,80,80);
    context.drawImage(player.img,0,0,256,256,player.x,player.y,70,70);
   // const angleInRadian = buzzsawAngle * Math.PI / 180;
   // context.save();
   // context.translate(buzzsaw.x + 400,buzzsaw.y + 400);
    //context.rotate(angleInRadian);
    
    context.drawImage(buzzsaw.img,0,0,425,425,buzzsaw.x,buzzsaw.y,120,120);
    //context.restore();

    context.drawImage(star.img,0,0,425,425,star.x,star.y,120,120);   
   

    context.font = "26px Arial Black";
    context.fillStyle="black";
    context.fillText("Lives : " + currentlives, 10,25);
    if(lost==true){
        context.font = "72px Arial Black";
        context.fillStyle="red";
        context.fillText("YOU LOSE!", 180,400);
        gameOver=true;
    }
    else if(won==true){
        context.font = "72px Arial Black";
        context.fillStyle="blue";
        context.fillText("YOU WIN!", 200,400);
        gameOver=true;
    }
}

document.getElementById("buttonUp").onmouseup=function(){noClick()};
document.getElementById("buttonLeft").onmouseup=function(){noClick()};
document.getElementById("buttonRight").onmouseup=function(){noClick()};
document.getElementById("buttonDown").onmouseup=function(){noClick()};

function noClick(){
    direction=0;
}

  
