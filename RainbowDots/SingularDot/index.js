//Canvas options:
var fps = 60;
var capturer = new CCapture({ format: 'png', framerate: fps });

var canwidth = 1000;
var canheight = 1000;

//Program relevant vars:
var circlenum = 10;
var circlelist = [];

var radius = 40;

var maxmag = canheight/2 - 100;

var cur = 0;

var middlex = canwidth/2;
var middley = canheight/2;

//Checks when to end animation:
function checkforEnd(t) {
    if (t > 30*Math.PI) {
        noLoop();
        console.log('finished recording.');
        capturer.stop();
        capturer.save();
        return;
    }
}

//Setting canvas up:
function setup() {
    createCanvas(canwidth, canheight);
    frameRate(fps);
    capturer.start();

    //init the cirlces
    for(var i = 0; i < circlenum; i++) {
        circlelist.push(new Circle(Math.floor((1/circlenum) * i * 360), i));
    }
}

//Program relevant functions:
function headingFunction(x) {
    return Math.abs((Math.sin(x*0.1))/50);
}
function magFunction(x) {
    return Math.abs(Math.sin(x*0.1) * maxmag);
}

function isReversed(x) {
    if(Math.floor(Math.sin(x*0.1) + 1) - 1 == -1) {
        return -1;
    } else {
        return 1;
    }
}

function Circle(hue, num) {
    this.vector = createVector(1,1);
    this.vector.rotate((1/circlenum) * num * Math.PI * 2);
    this.hue = hue;
}

Circle.prototype.drawCircle = function(t) {
    var colorcur = color('hsla(' + this.hue + ", 70%, 50%, 1)");
    stroke(colorcur);
    fill(colorcur);

    var reverse = isReversed(t);
    ellipse(reverse * (this.vector.x) + middlex, reverse * (this.vector.y) + middley, radius, radius);

    this.vector.rotate(headingFunction(t));
    this.vector.setMag(magFunction(t));
}

//What is drawn:
function drawingFunc(t) {
    background(255);

    for(var i = 0; i < circlenum; i++) {
        circlelist[i].drawCircle(t);
    }
}

//Drawing function
function draw() {
    cur += 0.5;
    drawingFunc(cur);

    checkforEnd(cur);
    capturer.capture(document.getElementById('defaultCanvas0'));
}