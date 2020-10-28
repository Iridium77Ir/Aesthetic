var w = 500, h = 800;

var bgc = '#00361d';
var fgc = '#ffd829';

var lines = 8;
var maxlength = 10;
var multi = 20;

function setup() {
    createCanvas(w, h);
    strokeWeight(32);
    stroke(bgc);
}

function draw() {
    background(bgc);
    noLoop();

    drawLines();
}

function drawLines() {
    for(var i = 0; i < lines; i++) {
        drawLine(w/lines * i);
    }
}

function drawLine(x) {
    var array = [];
    var count = 0;
    noFill();
    beginShape();
    for(var y = 0; y < h+100; ) {
        array.push([]);
        array[count][0] = {x: x, y: y};
        vertex(x, y);
        y += ceil(random()*maxlength) * multi;
        array[count][1] = {x: x, y: y};
        vertex(x, y);
        x += ceil(random()*maxlength) * multi;
        array[count][2] = {x: x, y: y};
        vertex(x, y);
        y += ceil(random()*maxlength) * multi;
        array[count][3] = {x: x, y: y};
        vertex(x, y);
        x -= ceil(random()*maxlength) * multi;
        count++;
    }
    endShape();
    push();
    stroke(fgc);
    strokeWeight(8);
    beginShape();
    for(var i = 0; i < count; i++) {
        vertex(array[i][0].x, array[i][0].y);
        vertex(array[i][1].x, array[i][1].y);
        vertex(array[i][2].x, array[i][2].y);
        vertex(array[i][3].x, array[i][3].y);
    }
    endShape();
    pop();
}