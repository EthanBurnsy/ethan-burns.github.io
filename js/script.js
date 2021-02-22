//game object artibutes
function GameObject(name, image, health, x, y) {
    this.name = name;
    this.img = image; // this can be used to hold image filename
    this.health = health;
    this.x = x; // initialised at 0 ***
    this.y = y; // initialised at 0 ***
}
function drawTimer(timeLeft) {
    var width = 120;
    var height = 20;
    var max = 100;
    var value = timeLeft;

    //drawing the timer bar background
    context.fillStyle = "#000000";
    context.fillRect(0,0,width,height);

    //draw the time bar value
    context.fillStyle = "#420AA9";
    var fillValue = Math.min(Math.max(value/max,0),1);
    context.fillRect(0,0,fillValue*width,height);
}

// The GamerInput is an Object that holds the Current
var canvas=document.getElementById("game");
var context=canvas.getContext("2d");

// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input
var direction = 0;

//sprites objects and images for game
var sprite= new Image();
var AIsprite =new Image();
sprite.src="./img/1to6.png";
AIsprite.src="./img/Bush.png";

// Default Player
var player = new GameObject("Player", sprite, 100, 100, 100);
var enemy = new GameObject("enemy",AIsprite,100, 200, 400);

// Gameobjects is a collection of the Actors within the game
// this is an Array
var gameobjects = [player,enemy];
var frames=6;
var currentFrame=0;

//time set
var initial = new Date().getTime();
var current;

var counter = 0;
var bushclear = false;

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
    // console.log("Gamer Input :" + gamerInput.action);
}

function update() {
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

        if (gamerInput.action === "Up") {
            gameobjects[i].health = 100;
            // console.log("Up");
        }

        if (gameobjects[i].health >= 1) {
            gameobjects[i].health = gameobjects[i].health - 1;
            // console.log("Health :" + gameobjects[i].health);

        } else {
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  Y: " + gameobjects[i].y + " looks like its not alive :'(");
        }
    }
    switch (direction){
        case 0:
            player.x = player.x;
            player.y = player.y;
            break;
        case 1:
            player.x -=10;
            break;
        case 2:
            player.x +=10;
            break;
        case 3:
            player.y -=10;
            break;
        case 4:
            player.y +=10;
            break;
    }
    if(counter === 8000)
    {
        bushclear = true;
    }
    else
    {
        counter++;
    }
}

// Modify to Draw to Screen
function draw() {
    // console.log("Draw");
    for (i = 0; i < gameobjects.length; i++) {
        if (gameobjects[i].health > 0) {
           // console.log("Image :" + gameobjects[i].img);
        }
    }
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
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(player.img,(player.img.width/6)*currentFrame,0,256,256,player.x,player.y,256,256);
    if(bushclear == false){
        context.drawImage(enemy.img,enemy.x,enemy.y,enemy.img.width,enemy.img.height); 
    }
    else{
        context.clearRect(enemy.x,enemy.y,enemy.img.width,enemy.img.height);
    }
    drawTimer(counter/5);
}
document.getElementById("buttonUp").onmouseup=function(){noClick()};
document.getElementById("buttonLeft").onmouseup=function(){noClick()};
document.getElementById("buttonRight").onmouseup=function(){noClick()};
document.getElementById("buttonDown").onmouseup=function(){noClick()};

function noClick(){
    direction=0;
}


