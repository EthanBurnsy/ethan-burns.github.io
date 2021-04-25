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
var Music = document.getElementById("Music");

// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input
var direction = 0;
var stardirection = 0;
var stardirection1 = 0;
var stardirection2 = 0;
var stardirection3 = 0;
var stardirection4 = 0;
var stardirection5 = 0;

//sprites objects and images for game
var sprite= new Image();
var saw =new Image();
var star = new Image();
var start = new Image();
var end = new Image();

//image sources for assets
sprite.src="./img/blobbert.png";
saw.src="./img/buzzsaw.png";
star.src="./img/ninjastar.png";
start.src="./img/startpoint.png";
end.src="./img/endpoint.png";

// Default Player
var player = new GameObject("Player", sprite, 0, 5, 5);
// Default buzzsaws
var buzzsaw = new GameObject("buzzsaw", saw, 0, 205, -20);
var buzzsaw1 = new GameObject("buzzsaw1", saw, 0, 205, 105);
var buzzsaw2 = new GameObject("buzzsaw2", saw, 0, 205, 230);
var buzzsaw3 = new GameObject("buzzsaw3", saw, 0, 80, 270);
var buzzsaw4 = new GameObject("buzzsaw4", saw, 0, -20, 70);
var buzzsaw5 = new GameObject("buzzsaw5", saw, 0, 80, 395);
var buzzsaw6 = new GameObject("buzzsaw6", saw, 0, 80, 520);
var buzzsaw7 = new GameObject("buzzsaw7", saw, 0, 425, 520);
var buzzsaw8 = new GameObject("buzzsaw8", saw, 0, 425, 395);
var buzzsaw9 = new GameObject("buzzsaw9", saw, 0, 425, 270);
var buzzsaw10 = new GameObject("buzzsaw10", saw, 0, 425, 145);
var buzzsaw12 = new GameObject("buzzsaw12", saw, 0, 510, 635);
var buzzsaw13 = new GameObject("buzzsaw13", saw, 0, 660, 145);
// Default Ninja stars
var ninjastar = new GameObject("ninjastar", star, 0, 300, 670);
var ninjastar1 = new GameObject("ninjastar1", star, 0, 328, 400);
var ninjastar2 = new GameObject("ninjastar2", star, 0, 440, 20);
var ninjastar4 = new GameObject("ninjastar4", star, 0, 680, 530);
var ninjastar5 = new GameObject("ninjastar5", star, 0, 540, 300);



var startpoint = new GameObject("startpoint", start, 0, 0, 5);
var endpoint = new GameObject("endpoint", end, 0, 725, 730);

// Gameobjects is a collection of the Actors within the game
// this is an Array
var gameobjects = [player,buzzsaw];
var frames=3;
var currentFrame=0;


//time set
var initial = new Date().getTime();
var current;
var counter = 0;
var currentlives = 3;
var speed=1;
var lost = false;
var won = false;

//mouse direction functions
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
//Function to check the borders of the Buzzsaws and Ninja stars
function checkBorder(){
    if(player.x>=ninjastar.x - 45 && player.x<=ninjastar.x + 100)
    {
        if(player.y>=ninjastar.y - 45 && player.y<=ninjastar.y + 100)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=ninjastar1.x - 45 && player.x<=ninjastar1.x + 100)
    {
        if(player.y>=ninjastar1.y - 45 && player.y<=ninjastar1.y + 100)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=ninjastar2.x - 45 && player.x<=ninjastar2.x + 100)
    {
        if(player.y>=ninjastar2.y - 45 && player.y<=ninjastar2.y + 100)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=ninjastar4.x - 45 && player.x<=ninjastar4.x + 100)
    {
        if(player.y>=ninjastar4.y - 45 && player.y<=ninjastar4.y + 100)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=ninjastar5.x - 45 && player.x<=ninjastar5.x + 100)
    {
        if(player.y>=ninjastar5.y - 45 && player.y<=ninjastar5.y + 100)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw.x - 45 && player.x<=buzzsaw.x + 125)
    {
        if(player.y>=buzzsaw.y - 45 && player.y<=buzzsaw.y + 380)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw3.x - 45 && player.x<=buzzsaw3.x + 125)
    {
        if(player.y>=buzzsaw3.y - 45 && player.y<=buzzsaw3.y + 380)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw10.x - 45 && player.x<=buzzsaw10.x + 125)
    {
        if(player.y>=buzzsaw10.y - 45 && player.y<=buzzsaw10.y + 500)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw12.x - 45 && player.x<=buzzsaw12.x + 125)
    {
        if(player.y>=buzzsaw12.y - 45 && player.y<=buzzsaw12.y + 125)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw4.x - 45 && player.x<=buzzsaw4.x + 125)
    {
        if(player.y>=buzzsaw4.y - 45 && player.y<=buzzsaw4.y + 125)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
    if(player.x>=buzzsaw13.x - 45 && player.x<=buzzsaw13.x + 125)
    {
        if(player.y>=buzzsaw13.y - 45 && player.y<=buzzsaw13.y + 125)
        {
            player.x = 5;
            player.y = 5;
            currentlives --;
        }
    }
}
//function to check the lives to see if game over is true
function checkLives(){
    if(currentlives>=1)
    {
         lost = false;
    }
    else {
         lost =  true;
    }
}
//checks to see if the player has reached the goal
function checkGoal(){
    if(player.x>=endpoint.x - 20 && player.x<=endpoint.x + 20)
    {
        if(player.y>=endpoint.y - 20 && player.y<=endpoint.y + 20)
        {
            won = true;
        }
    }
}
//updates listed functions below constantly to check values
function update() {

    checkBorder();
    checkLives();
    checkGoal();
//check to see Ninja Stars co-ords to send it back and fourth
    if (ninjastar.x > 410){
    stardirection = 1;
    }
    if(ninjastar.x < 0){
    stardirection = 0;
    }

    if(stardirection == 0)
    {
        ninjastar.x ++;
    }
    else if(stardirection == 1)
    {
        ninjastar.x--;
    }
    
    if (ninjastar1.y > 530){
        stardirection1 = 1;
        }
        if(ninjastar1.y < 160){
        stardirection1 = 0;
        }
    
        if(stardirection1 == 0)
        {
            ninjastar1.y ++;
        }
        else if(stardirection1 == 1)
        {
            ninjastar1.y--;
        }

        if (ninjastar2.x > 680){
            stardirection2 = 1;
            }
            if(ninjastar2.x < 440){
                stardirection2 = 0;
            }
        
            if(stardirection2 == 0)
            {
                ninjastar2.x ++;
            }
            else if(stardirection2 == 1)
            {
                ninjastar2.x--;
            }
                if (ninjastar4.x > 680){
                    stardirection4 = 1;
                    }
                    if(ninjastar4.x < 540){
                        stardirection4 = 0;
                    }
                
                    if(stardirection4 == 0)
                    {
                        ninjastar4.x ++;
                    }
                    else if(stardirection4 == 1)
                    {
                        ninjastar4.x--;
                    }
                    if (ninjastar5.x > 680){
                        stardirection5 = 1;
                        }
                        if(ninjastar5.x < 540){
                            stardirection5 = 0;
                        }
                    
                        if(stardirection5 == 0)
                        {
                            ninjastar5.x ++;
                        }
                        else if(stardirection5 == 1)
                        {
                            ninjastar5.x--;
                        }
//canvas border check so player cant escape
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
//while game over is false player can move
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
//gameloop function componants
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
    if (current - initial >= 100) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames;
        initial = current; // reset initial
    } 
    
   //clear reactangle 
    context.clearRect(0,0,canvas.width,canvas.height);
    //draws static assets in starting positions
    context.drawImage(startpoint.img,0,0,256,256,startpoint.x,startpoint.y,80,80);
    context.drawImage(endpoint.img,0,0,256,256,endpoint.x,endpoint.y,80,80);
    context.drawImage(player.img,0,0,256,256,player.x,player.y,70,70);

    
    //drawing the animated buzzsaws
    context.drawImage(buzzsaw.img, (buzzsaw.img.width / 3)*currentFrame,0,425,425,buzzsaw.x,buzzsaw.y,180,180);
    context.drawImage(buzzsaw1.img, (buzzsaw1.img.width / 3)*currentFrame,0,425,425,buzzsaw1.x,buzzsaw1.y,180,180);
    context.drawImage(buzzsaw2.img, (buzzsaw2.img.width / 3)*currentFrame,0,425,425,buzzsaw2.x,buzzsaw2.y,180,180);
    context.drawImage(buzzsaw3.img, (buzzsaw3.img.width / 3)*currentFrame,0,425,425,buzzsaw3.x,buzzsaw3.y,180,180);
    context.drawImage(buzzsaw4.img, (buzzsaw4.img.width / 3)*currentFrame,0,425,425,buzzsaw4.x,buzzsaw4.y,180,180);
    context.drawImage(buzzsaw5.img, (buzzsaw5.img.width / 3)*currentFrame,0,425,425,buzzsaw5.x,buzzsaw5.y,180,180);
    context.drawImage(buzzsaw6.img, (buzzsaw6.img.width / 3)*currentFrame,0,425,425,buzzsaw6.x,buzzsaw6.y,180,180);
    context.drawImage(buzzsaw7.img, (buzzsaw7.img.width / 3)*currentFrame,0,425,425,buzzsaw7.x,buzzsaw7.y,180,180);
    context.drawImage(buzzsaw8.img, (buzzsaw8.img.width / 3)*currentFrame,0,425,425,buzzsaw8.x,buzzsaw8.y,180,180);
    context.drawImage(buzzsaw9.img, (buzzsaw9.img.width / 3)*currentFrame,0,425,425,buzzsaw9.x,buzzsaw9.y,180,180);
    context.drawImage(buzzsaw10.img, (buzzsaw10.img.width / 3)*currentFrame,0,425,425,buzzsaw10.x,buzzsaw10.y,180,180);
    context.drawImage(buzzsaw12.img, (buzzsaw12.img.width / 3)*currentFrame,0,425,425,buzzsaw12.x,buzzsaw12.y,180,180);
    context.drawImage(buzzsaw13.img, (buzzsaw13.img.width / 3)*currentFrame,0,425,425,buzzsaw13.x,buzzsaw13.y,180,180);

    //drawing the animated ninja stars
    context.drawImage(ninjastar.img, (ninjastar.img.width / 3)*currentFrame,0,425,425,ninjastar.x,ninjastar.y,150,150);
    context.drawImage(ninjastar1.img, (ninjastar1.img.width / 3)*currentFrame,0,425,425,ninjastar1.x,ninjastar1.y,150,150);
    context.drawImage(ninjastar2.img, (ninjastar2.img.width / 3)*currentFrame,0,425,425,ninjastar2.x,ninjastar2.y,150,150);
    context.drawImage(ninjastar4.img, (ninjastar4.img.width / 3)*currentFrame,0,425,425,ninjastar4.x,ninjastar4.y,150,150);
    context.drawImage(ninjastar5.img, (ninjastar5.img.width / 3)*currentFrame,0,425,425,ninjastar5.x,ninjastar5.y,150,150);  
   
    //text for the lives on screen
    context.font = "26px Arial Black";
    context.fillStyle="black";
    //check current lives number and display to screen
    context.fillText("Lives : " + currentlives, 10,25);
    //Check to see if player lost is true and apply lose screen
    if(lost==true){
        context.font = "72px Arial Black";
        context.fillStyle="red";
        context.fillText("YOU LOSE!", 180,400);
        gameOver=true;
    }
    //Check to see if player won is true and apply win screen
    else if(won==true){
        context.font = "72px Arial Black";
        context.fillStyle="blue";
        context.fillText("YOU WIN!", 200,400);
        gameOver=true;
    }
    //Play music when lives are 3 or less (as soon as the player interacts)
    if(currentlives<=3){
        Music.play();
    }
}
//mouse click functions
document.getElementById("buttonUp").onmouseup=function(){noClick()};
document.getElementById("buttonLeft").onmouseup=function(){noClick()};
document.getElementById("buttonRight").onmouseup=function(){noClick()};
document.getElementById("buttonDown").onmouseup=function(){noClick()};

function noClick(){
    direction=0;
}

  
