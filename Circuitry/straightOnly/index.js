var w = 1000, h = 1000;

var bgc = '#00361d';
var fgc = '#ffd829';

var lines = 20;
var maxlength = 10;
var multi = 20;

var linethick = 5;

var linearrayW = [];
var linearrayH = [];

function setup() {
    createCanvas(w, h);
    strokeWeight(linethick*4);
    stroke(bgc);
    noFill();

    for(var x = 0; x < lines; x++) {
        linearrayW.push(w/lines * x);
    }
    for(var y = 0; y < lines; y++) {
        linearrayH.push(h/lines * y);
    }
}

function draw() {
    background(bgc);
    noLoop();

    drawLines();
}

function drawLines() {
    while(linearrayW.length > 0 && linearrayH.length > 0) {
        var randomnum = floor(random() * linearrayW.length);
        drawLineHorizontal(linearrayW[randomnum]);
        linearrayW.splice(randomnum, 1);
        var randomnum = floor(random() * linearrayH.length);
        drawLineVertical(linearrayH[randomnum]);
        linearrayH.splice(randomnum, 1);
    }
}

function drawLineHorizontal(x) {

    beginShape();
    vertex(x, 0);
    vertex(x, h);
    endShape();

    push();
        stroke(fgc);
        strokeWeight(linethick);
        beginShape();
        vertex(x, 0);
        vertex(x, h);
        endShape();
    pop();
}

function drawLineVertical(y) {

    beginShape();
    vertex(0, y);
    vertex(w, y)
    endShape();

    push();
        stroke(fgc);
        strokeWeight(linethick);
        beginShape();
        vertex(0, y);
        vertex(w-10, y);
        endShape();
    pop();
}