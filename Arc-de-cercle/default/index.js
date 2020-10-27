var w = 1000, h = 1000;
var circleAmountW = 10;
var circleAmountH = 10;
var circleR = w/circleAmountW;
var marginConst = 50;
var sidesarray = [];
var colorarray = [];
var rotationspeed = 1;
var colors = ['#fcba03', '#05005e', '#46dcfa', '#fa6a46'];
var bgc = '#424242';

function setup() {
    createCanvas(w, h);
    noFill()
    strokeWeight(2);
    sidesarray = sidesArrayInit();
    colorarray = colorArrayInit();
}

function draw() {
    frameRate(4);
    background(color(bgc));
    for(var i = 0; i < circleAmountW; i++) {
        for(var  j = 0; j < circleAmountW; j++) {
            stroke(color(colorarray[i][j]));
            drawCircle(i*circleR + marginConst, j*circleR + marginConst, round(random()*3), PI * (round((map(noise(i, j), 0, 1, 0, 1)*4)/4)));
        }
    }
    noLoop();
}

function sidesArrayInit() {
    var array = [];
    for(var i = 0; i < circleAmountW; i++) {
        array.push([])
        for(var  j = 0; j < circleAmountW; j++) {
            array[i][j] = round(random()*3);
        }
    }
    return array;
}

function colorArrayInit() {
    var array = [];
    for(var i = 0; i < circleAmountW; i++) {
        array.push([])
        for(var  j = 0; j < circleAmountW; j++) {
            array[i][j] = colors[floor(random()*colors.length)];
        }
    }
    return array;
}

function drawCircle(x,y, sides, angle) {
    arc(x, y, circleR, circleR, PI/2 + angle, (sides+1) * (PI/2) + angle);
}