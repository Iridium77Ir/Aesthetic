//Canvas options:
var fps = 60;

let w = 10;
let angle = 0;
let SCALE_FACTOR;

let f = chroma.scale(['yellow', 'lightgreen', '008ae5']).mode('lab');

var rectlist;

var friction = 0.9;
var k = 0.1;
var defH = 500;

var clickR = 2;

var framecount = 0;

let colorlist;

function setup() {
    createCanvas(1000, 1000, WEBGL);
    frameRate(fps);

    angleMode(DEGREES);
    noStroke();

    rectlist = [];

    for(var i = 0; i < height; i += w) {
        rectlist.push([]);
        for(var j = 0; j < width; j += w) {
            rectlist[i/w].push(new Rectangle(i, j));
        }
    }

    startRecording();
}

function drawFaceBox(w, h, d) {
    sinCol = h/700;

    // Center the box.
    translate(-w / 2, -h / 2);

    //right

    push();

    fill(color(f(sinCol).saturate(2).hex()));
    quad(0, 0, w, 0, w, h, 0, h);

    fill(color(f(sinCol).darken().hex()));
    translate(0, 0, -d);
    rotateY(-90);
    quad(0, 0, d, 0, d, h, 0, h);

    fill(color(f(sinCol).hex()));
    translate(0, 0, -d);
    rotateX(90);
    quad(0, 0, w, 0, w, d, 0, d);

    pop();
}

function mouseClicked() {
    if(Math.floor((mouseX)/w) < rectlist.length-1 && Math.floor((mouseY)/w) < rectlist[Math.floor((mouseX)/w)].length-1 && Math.floor((mouseX)/w) >= 0 && Math.floor((mouseY)/w) >= 0) {
        rectlist[Math.floor((mouseX)/w)][Math.floor((mouseY)/w)].h -= 500;
    }
}

function check() {
    //if(framecount%2 == 0) {
        /* saveCanvas('myCanvas', 'png'); */
        if(framecount == 1000) {
            /* noLoop();
            return; */
            noLoop();
            stopRecording();
        }
    //}
}

function Rectangle(x,y) {
    this.x = x/w;
    this.y = y/w;

    this.h = defH;

    this.posx = x;
    this.posy = y;
    
    this.vz = 0;
    this.accz = 0;
}

function sigmoid(x) {
    return 1/(1+Math.exp(-x + 5));
}

Rectangle.prototype.drawRect = function() {
    //update
    this.accz = (defH - this.h) * k;

    //adding surroundings
    if(this.x != height/w-1 && this.x != 0 && this.y != width/w-1 && this.y != 0) {
        this.accz += 1.5 * sigmoid(rectlist[this.x + 1][this.y].vz +  rectlist[this.x][this.y - 1].vz + rectlist[this.x - 1][this.y].vz + rectlist[this.x][this.y + 1].vz);
    }
    
    this.vz += this.accz;
    this.vz *= friction;
    this.h += this.vz;

    //draw
    push();
    translate(this.posx - width / 2, 0, this.posy - height / 2);
    drawFaceBox(w,this.h,w);
    pop();
}

function draw() {
    background(255);

    ortho(-1000, 1000, -1000, 1000, 0, 1500);
    rotateX(-30);
    rotateY(45 + angle);
    
    for(var i = 0; i < height/w; i ++) {
        for(var j = 0; j < width/w; j ++) {
            rectlist[i][j].drawRect();
        }
    }

    //angle += 0.1;

    check();
    framecount += 1;
}