function setup() {
    createCanvas(main.w, main.h);
    createFlock();
    noFill();
    stroke(color('rgba(' + main.boid.col[0] + ', ' + main.boid.col[1] + ', ' + main.boid.col[2] + ', ' + main.boid.col[3] + ')'));
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
}