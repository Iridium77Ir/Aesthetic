function setup() {
    createCanvas(main.w, main.h);
    createFlock();
    noFill();
}

function createFlock() {
    for(var i = 0; i < main.flock.size; i++) {
        main.flock.list.push(new Boid());
    }
}

function draw() {
    frameRate(60);
    background(main.bgc);

    updateFlock();
}

function updateFlock() {
    for(var i = 0; i < main.flock.size; i++) {
        main.flock.list[i].edge();
        main.flock.list[i].moveBoid();
        main.flock.list[i].drawBoid();
    }
    for(var i = 0; i < main.draw.list.length; i++) {
        stroke(main.draw.list[i][6]);
        triangle(main.draw.list[i][0],main.draw.list[i][1],main.draw.list[i][2],main.draw.list[i][3],main.draw.list[i][4],main.draw.list[i][5]);
        if(main.draw.list.length > 4000) {
            main.draw.list.shift();
        }
    }
}