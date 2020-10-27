var w = 1000, h = 1000;

var thickSlider = document.getElementById('thickness');
var densitySlider = document.getElementById('circledensity');

var circleAmountW = densitySlider.value;
var circleAmountH = densitySlider.value;
var circleR = w/(circleAmountW-1);
var marginConst = 0;
var sidesarray = [];
var colorarray = [];
var anglesarray = [];
var rotationspeed = 1;
var colors = ['#fcba03', '#05005e', '#46dcfa', '#fa6a46'];
var bgc = '#424242';

var frameCounter = 0;

function setup() {
    createCanvas(w, h);
    noFill()
    strokeWeight(w/circleR * (thickSlider.value/thickSlider.max));
    sidesarray = sidesArrayInit();
    colorarray = colorArrayInit();
    anglesarray = anglesArrayInit();
}

function draw() {
    if(frameCounter%(circleAmountH*circleAmountW) == 0) {
        frameCounter = 0;
    }

    //Does it from left to right
    /* anglesarray[frameCounter%circleAmountW][floor(frameCounter/circleAmountH)]++; */

    //Does it randomly
    /* anglesarray[floor(random()*circleAmountW)][floor(random()*circleAmountH)]++; */

    //Does it randomly - with noise
    anglesarray[floor(noise(frameCount+10)*circleAmountW)][floor(noise(frameCount)*circleAmountH)]++;
    colorarray[floor(noise(frameCount+10)*circleAmountW)][floor(noise(frameCount)*circleAmountH)] = colors[round(map(frameCounter, 0, (circleAmountH*circleAmountW)+10, 0, colors.length-1))];

    frameRate(60);
    background(color(bgc));
    for(var i = 0; i < circleAmountW; i++) {
        for(var  j = 0; j < circleAmountW; j++) {
            stroke(color(colorarray[i][j]));
            drawCircle(i*circleR + marginConst, j*circleR + marginConst, sidesarray[i][j], anglesarray[i][j]);
        }
    }
    frameCounter++;
}

function anglesArrayInit() {
    var array = [];
    for(var i = 0; i < circleAmountW; i++) {
        array.push([])
        for(var  j = 0; j < circleAmountW; j++) {
            array[i][j] = round((map(noise(i, j), 0, 1, 0, 1)*4)/4);
        }
    }
    return array;
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
    arc(x, y, circleR, circleR, PI/2 + (angle * PI/2), ((sides+1) * (PI/2)) + (angle * PI/2));
}

function update() {
    strokeWeight(w/circleR * (thickSlider.value/thickSlider.max));

    circleAmountW = densitySlider.value;
    circleAmountH = densitySlider.value;

    circleR = w/(circleAmountW-1);

    sidesarray = sidesArrayInit();
    colorarray = colorArrayInit();
    anglesarray = anglesArrayInit();
    frameCounter = 0;
}