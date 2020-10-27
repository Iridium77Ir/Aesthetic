let w = 10;
let maxD;
let angle = 0;
let SCALE_FACTOR;

let f = chroma.scale(['yellow', 'lightgreen', '008ae5']).mode('lab');

var rectlist;

var friction = 0.9;
var k = 0.1;
var defH = 500;

var clickR = 2;

function setup() {
    createCanvas(1000, 1000, WEBGL);
    angleMode(DEGREES);
    maxD = dist(0,0,200,200);
    noStroke();
    SCALE_FACTOR = 1;

    rectlist = [];

    for(var i = 0; i < height; i += w) {
        rectlist.push([]);
        for(var j = 0; j < width; j += w) {
            rectlist[i/w].push(new Rectangle(i, j));
        }
    }
}

function drawFaceBox(boxWidth, boxHeight, boxDepth, a) {
    let w = boxWidth * SCALE_FACTOR;
    let h = boxHeight;
    let d = boxDepth * SCALE_FACTOR;

    let sinCol = map(a, 0, 700, 0, 1);
    let colR = f(sinCol).saturate(2).hex();
    let colL = f(sinCol).darken().hex();
    let colT = f(sinCol).hex();

    // Center the box.
    translate(-w / 2, -h / 2);

    //right

    push();

    fill(color(colR));
    quad(0, 0, w, 0, w, h, 0, h);

    pop();

    //left

    push();

    fill(color(colL));
    translate(0, 0, -d);
    rotateY(-90);
    quad(0, 0, d, 0, d, h, 0, h);

    pop();

    //top

    push();

    fill(color(colT));
    translate(0, 0, -d);
    rotateX(90);
    quad(0, 0, w, 0, w, d, 0, d);

    pop();
}

function mouseClicked() {
    if(Math.floor((mouseX)/w) < rectlist.length && Math.floor((mouseY)/w) < rectlist[Math.floor((mouseX)/w)].length) {
        /* for(var i = -clickR; i < clickR; i++) {
            for(var j = -clickR; j < clickR; j++) {
                rectlist[Math.floor((mouseX)/w) - i][Math.floor((mouseY)/w) - j].h -= 300 * (Math.sin(map(i, -clickR, clickR, 0, Math.PI)) + Math.sin(map(j, -clickR, clickR, 0, Math.PI)));
            }
        } */
        rectlist[Math.floor((mouseX)/w)][Math.floor((mouseY)/w)].h -= 500;
    }
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
    drawFaceBox(w,this.h,w, this.h);
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
}