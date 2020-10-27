// the frame rate
var fps = 60;
// the canvas capturer instance
var capturer = new CCapture({ format: 'png', framerate: fps });

var canwidth = window.innerWidth;
var canheight = window.innerHeight;

var inc = 0.03;
var cur = 0;
var step = 0.1;

var radius = 1;
var objcolor = 'rgba(0,0,0,0.03)';

var color1 = 'hsla(';
var color2 = ', 59%, 32%, 0.03)';

var space = 20;

var row = Math.floor(canwidth/space);
var col = Math.floor(canheight/space);

var vectorlist = [];

var particlenum = 50;
var particlegone = 0;
var particlelist = [];

var linelist = [];

var heightvar = space;

var friction = 0.6;
var influence = 15;
var accoeff = 10;

function easymap(n, start1, stop1, start2, stop2) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
}

function Particle(x, y) {

    /* this.x = x*space+11;
    this.y = y*space+11; */
    this.x = space*(row-1);
    this.y = 300 + Math.round(y/1000)*400;

    this.prevx = this.x;
    this.prevy = this.y;

    this.vx = 0;
    this.vy = 0;

    this.accx = 0;
    this.accy = 0;

    this.friction = friction + Math.random()*0.1;
    this.influence = influence + Math.random()*0.5;
    this.accoeff = accoeff + Math.random()*5;

    this.color = color1 + Math.floor(easymap(this.x, 0, space, 0, 360)) + color2;

    this.gone = false;
}

function Vector(x, y) {

    this.x = x*space;
    this.y = y*space;

    this.angle = 0;
}

Particle.prototype.drawParticle = function() {
    if(this.x > 10 && this.x < space*row && this.y > 10 && this.y < space*col) {
            angle = vectorlist[Math.floor(this.x/space)][Math.floor(this.y/space)].angle,
            this.accy = Math.sin(angle) * this.influence;
            this.accx = Math.cos(angle) * this.accoeff;

            this.vx += this.accx;
            this.vy += this.accy;

            this.vx *= this.friction;
            this.vy *= this.friction;

            this.x += this.vx;
            this.y += this.vy;

            this.color = color1 + Math.floor(easymap(this.x, 0, canwidth, 0, 360)) + color2;
            linelist[linelist.length-1].push({x: this.x, y: this.y, xprev: this.prevx, yprev: this.prevy, color: this.color})

            this.prevx = this.x;
            this.prevy = this.y;
    } else {
        this.edge(true);
    }
}

Particle.prototype.edge = function() {
    /* if(this.x <= 11) {
        this.x = canwidth-20;
        this.prevx = this.x;
    } else if (this.x >= row*space) {
        this.x = 12;
        this.prevx = this.x;
    }
    if(this.y <= 11) {
        this.y = canheight-20;
        this.prevy = this.y;
    } else if (this.y >= space*col) {
        this.y = 12;
        this.prevy = this.y;
    } */
    if(!this.gone) {
        particlegone += 1;
        this.gone = true;
    }
    this.x = 5000;
    this.prevx = 5000;
    this.y = 5000;
    this.prevy = 5000;
}

Vector.prototype.drawVector = function(noise) {
    this.angle = -1 * noise;
}

for(var i = 0; i < row; i++) {
    vectorlist.push([]);
    for(var j = 0; j < col; j++) {
        vectorlist[i].push(new Vector(i, j));
    }
}

for(var i = 0; i < particlenum; i++) {
    particlelist.push([]);
    for(var j = 0; j < particlenum; j++) {
        particlelist[i].push(new Particle((canwidth/particlenum)*i, (canheight/particlenum)*j));
    }
}

function drawFunc() {
    background(255);
    stroke(color(objcolor));
    cur += inc;

    linelist.push([]);
    for(var i = 0; i < particlenum; i++) {
        for(var j = 0; j < particlenum; j++) {
            particlelist[i][j].drawParticle();
        }
    }
    for(var i = 0; i < linelist.length; i++) {
        for(var j = 0; j < linelist[i].length; j++) {
            var curline = linelist[i][j];
            stroke(color(curline.color));
            line(curline.x, curline.y, curline.xprev, curline.yprev);
        }
    }
    if(cur > 1) {
        linelist.shift();
    }
    if(linelist[0].length == 0) {
        linelist.shift();
    }

    for(var i = 0; i < row; i++) {
        for(var j = 0; j < col; j++) {
            vectorlist[i][j].drawVector(map(noise(i*step, j*step, cur), 0, 1, 0, Math.PI*2));
        }
    }
}

//

function checkforEnd() {
    if (linelist.length == 0) {
        noLoop();
        console.log('finished recording.');
        capturer.stop();
        capturer.save();
        return;
    }
}


function setup() {
    createCanvas(canwidth, canheight);
    // this is optional, but lets us see how the animation will look in browser.
    frameRate(fps);
    // start the recording
    capturer.start();
}

// draw
function draw() {

    drawFunc();

    checkforEnd();

    // handle saving the frame
    capturer.capture(document.getElementById('defaultCanvas0'));
}