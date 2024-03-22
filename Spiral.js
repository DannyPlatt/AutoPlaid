/*
 * Spiral Generator: spiral.js
 * Author: Danny Platt
 * Date: Aug 21 2023
 * Last Updated: Mar. 22 2024
 */

// ==========================================
// all constants and variables declared here
const WIDTH = 800;
const HEIGHT = 800;
const center = [WIDTH/2, HEIGHT/2];
const maxRadius = HEIGHT/2;

let transInput;
let redInput;
let blueInput;
let greenInput;
let growthConstInput;
let iConstInput;
let simulationSpeedInput;
let yAngleModInput;
let xAngleModInput;
let backgroundInput;
let lineWeightInput;
let lineWeight
let angle = 0;
let angleV = 0.001;
let running = true
let x = 10;
let y = 10;
let prev = [0,0]
let i = 0;
let pause = false;
let iConst = 0.01;
let counter = 0;
let radius = 0;
let growthConst = 0.000;
let simulationSpeed = 30; //minimum can be 2
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
  setupUI()

  frameRate(60);
  createCanvas(WIDTH, HEIGHT);
  background(0);
  textSize(50); // Is this needed?
}


function draw() {
  growthConst = float(growthConstInput.value());
  iConst = float(iConstInput.value());
  simulationSpeed = float(simulationSpeedInput.value());
  lineWeight = float(lineWeightInput.value());
  if(backgroundInput.checked())
    background(0);
  infoText();

  translate(center[0], center[1]); //sets the center of the screen to be 0,0

  YangleMod = marker[1];
  XangleMod = marker[0];
  YangleMod += float(yAngleModInput.value())
  XangleMod += float(xAngleModInput.value())

  // Adjust the details of the shape, transparency of the stroke
  transparencyCounter += transparencyGrowth;
  // Allows transparency to grow and then takes remainder
  // stroke(transparencyCounter*3%200,transparencyCounter*2%225,transparencyCounter%255,transparencyCounter%transparencyMax);
  strokeWeight(lineWeight);

  stroke(redInput.value(), greenInput.value() ,blueInput.value(),transInput.value())
  beginShape();
  if (counter != 0)
    vertex(prev[0],prev[1]);

  while(counter < simulationSpeed){
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

  // Update all incrementing variables
  prev = [x,y];
  i += iConst;
  counter++;
  radius += growthConst;

  // **** End condition ****
  if (y >= maxRadius){
    background(0);
    radius = 0;
    counter = 0;
    prev = [0,0];
    running = false;
  }
}

function keyPressed(){
  // handle user input
  if (keyIsDown(32)){ // pause when spacebar is pressed
    if(pause == false){
      pause = true;
      noLoop();
    }
    else {
      loop()
      pause = false;
    }
  } 
  if (keyIsDown(67))
    background(0);//Causes the screen to clean
  else{
    if (keyIsDown(87)){
      marker[1] += 1;
      background(0);//Causes the screen to clean
    }
    if (keyIsDown(83)){
      marker[1] -= 1;
      background(0);//Causes the screen to clean
    }
    if (keyIsDown(68)){
      marker[0] += 1;
      background(0);//Causes the screen to clean
    }
    if (keyIsDown(65)){
      marker[0] -=1;
      background(0);//Causes the screen to clean
    }
  }
}
function setupUI(){
  // user UI to change settings
  backgroundInput = createCheckbox();
  backgroundInput.position(WIDTH + 200, HEIGHT-300);
  msg = createP('Background Reset:');
  msg.position(WIDTH + 40,HEIGHT-315);

  lineWeightInput = createInput('1','number');
  lineWeightInput.position(WIDTH + 200, HEIGHT-250);
  msg = createP('Line Weight:');
  msg.position(WIDTH + 90,HEIGHT-265);

  simulationSpeedInput = createInput('1000');
  simulationSpeedInput.position(WIDTH + 200, HEIGHT-200);
  msg = createP('Simulation Speed:');
  msg.position(WIDTH + 40,HEIGHT-215);

  iConstInput = createInput('0.00314');
  iConstInput.position(WIDTH + 200, HEIGHT-150);
  msg = createP('iConst:');
  msg.position(WIDTH + 120,HEIGHT-165);

  xAngleModInput = createInput('0.00');
  xAngleModInput.position(WIDTH + 200, HEIGHT-100);
  msg = createP('xAngleMod:');
  msg.position(WIDTH + 100,HEIGHT-115);

  yAngleModInput = createInput('0.01');
  yAngleModInput.position(WIDTH + 200, HEIGHT-50);
  msg = createP('yAngleMod:');
  msg.position(WIDTH + 100,HEIGHT-65);

  growthConstInput = createInput('0.0001');
  growthConstInput.position(WIDTH + 200, HEIGHT);
  msg = createP('Growth Constant:');
  msg.position(WIDTH + 40,HEIGHT-15);

  transInput = createSlider(0,255,50);
  transInput.position(WIDTH + 500, HEIGHT-150);
  msg = createP('Transparency:');
  msg.position(WIDTH + 380,HEIGHT-165);

  redInput = createSlider(0,255,255);
  redInput.position(WIDTH + 500, HEIGHT-100);
  msg = createP('Red:');
  msg.position(WIDTH + 440,HEIGHT-115);

  greenInput = createSlider(0,255,255);
  greenInput.position(WIDTH + 500, HEIGHT-50);
  msg = createP('Green:');
  msg.position(WIDTH + 440,HEIGHT-65);

  blueInput = createSlider(0,255,255);
  blueInput.position(WIDTH + 500, HEIGHT);
  msg = createP('Blue:');
  msg.position(WIDTH + 440,HEIGHT-15);


  msg = createP('Welcome to Spiral Generator!')
  msg.position(WIDTH + 20,45);
  msg = createP('Hetkeys:W,A,S,D control the X and Y angle modifiers')
  msg.position(WIDTH + 20,65);
  msg = createP('c: Clear Canvas');
  msg.position(WIDTH + 20,85);
  msg = createP('Spacebar: Pause');
  msg.position(WIDTH + 20,105);
  msg = createP('Settings for \"Background Reset\": I\'d recommend increasing line weight and transparency, simulationSpeed: 1000, iConst: 0.0314159, xangleMod: 0 yAngleMod: 0, then adjust your angle Mods. to get funkier Lissajous figures, change iConst to 0.314159 and start changing x&yAngleMod values eg. (2, 13.000)');
  msg.position(WIDTH + 20,125);

  msg = createP(marker);
}


function infoText(){
  textSize(50);
  fill(255);
  stroke(0);
  strokeWeight(4);
  msg.position(WIDTH + 20, 20);
  msg.html(marker);
}
