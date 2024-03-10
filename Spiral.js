/*
 * Spiral Generator: spiral.js
 * Author: Danny Platt
 * Date: Aug 21 2023
 */

// ==========================================
// all constants and variables declared here
const WIDTH = 800;
const HEIGHT = 800;
const center = [WIDTH/2, HEIGHT/2];
const maxRadius = HEIGHT/2;

let angle = 0;
let angleV = 0.001;
let running = true
let x = 10;
let y = 10;
let prev = [0,0]
let i = 0;
let iConst = 0.3;

let counter = 0;
let radius = 250;
let growthConst = 0.1;
let growthSpeed = 30; //minimum can be 2
let trans = 50;
let transparencyCounter = 0;
let transparencyGrowth = .5;
let transparencyMax = 255;
let XangleMod = 1;
let YangleMod = 1;

let marker = [1,1];

// ==========================================
    
function setup() {
    // sets framrate and creates canvas
    
    frameRate(30);
    createCanvas(WIDTH, HEIGHT);
    background(0);
}

function draw() {
    infoText();
    // Purpose: Draw and calculate the points for the shape
    translate(center[0], center[1]); //sets the center of the screen to be 0,0

    // ====================================================
    // real time modifiers. uses marker and maps it to scale
    //XangleMod = map(marker[0],-WIDTH/2,WIDTH/2,1,5);
    YangleMod = marker[1];
    XangleMod = marker[0];
    // ====================================================
    
    // Adjust the details of the shape, transparency of the stroke
    transparencyCounter += transparencyGrowth;
    // Allows transparency to grow and then takes remainder
    //stroke(transparencyCounter*2%200,transparencyCounter*2%225,transparencyCounter%255,transparencyCounter%transparencyMax);
    stroke(255,trans)
    strokeWeight(1);

    beginShape();
    if (counter != 0)
        vertex(prev[0],prev[1]);

    while(counter < growthSpeed){
        //rotate(angle);
        mathLoop();
    } 

    noFill();
    endShape();

    counter = 1;
    //ellipse(marker[0],marker[1],10);
    if (!running){
        background(0);
        running = true
    }

}
keyPressed();

function mathLoop(){
    /* Purpose: Calculate and place vertexes
     */

    // X & Y angleMod: as i counts up at a constant rate of iConst,
    // angleMod's cause the lysajuse patterns to appear
    // point multiplied by radius to be placed at distance from center
    x = cos(i*XangleMod)* radius;
    y = sin(i*YangleMod)* radius;

    // Does not draw the first line
    if (counter != 0){
        vertex(x,y);
    }
    // i is the change in sin and cos
    
    // ===============================================
    // This section updates all incrementing variables
    prev = [x,y];
    i += iConst;
    counter++;
    radius += growthConst;
    // ===============================================


    // **** End condition ****
    if (y >= maxRadius){
        //noLoop();
        background(0);
        radius = 0;
        counter = 0;
        prev = [0,0];
        running = false;
    }
}

function keyPressed(){
    background(0);//Causes the screen to clean
    if (keyIsDown(UP_ARROW))
        marker[1] += 1;
    if (keyIsDown(DOWN_ARROW))
        marker[1] -= 1;
    if (keyIsDown(RIGHT_ARROW))
        marker[0] += 1;
    if (keyIsDown(LEFT_ARROW))
        marker[0] -=1;
}

function infoText(){
    textSize(50);
    fill(255);
    text(marker,10,50);
}
