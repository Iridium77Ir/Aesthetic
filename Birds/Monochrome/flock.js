function Boid() {
    this.x = Math.random() * main.w;
    this.y = Math.random() * main.h;
    
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
}

Boid.prototype.moveBoid = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.velocity.rotate(map(noise(this.x * main.noise.scale, this.y * main.noise.scale), 0, 1, -1 * main.noise.influence, main.noise.influence));

    this.change();
}

Boid.prototype.change = function () {
    let desired1 = createVector();
    let desired2 = createVector();
    let desired3 = createVector();
    let sum1 = 0;
    let sum2 = 0;
    let sum3 = 0;
    for(var i = 0; i < main.flock.size; i++) {
        //align
        let d1 = dist(this.x, this.y, main.flock.list[i].x, main.flock.list[i].y);
        if(main.flock.list[i] != this && d1 < main.flock.perceptionRadius * 1) {
            desired1.add(main.flock.list[i].velocity);
            sum1++;
        }
        //seperation
        let d2 = dist(this.x, this.y, main.flock.list[i].x, main.flock.list[i].y);
        if (main.flock.list[i] != this && d2 < main.flock.perceptionRadius * 0.5) {
            desired2.add(main.flock.list[i].velocity);
            sum3++;
        }
        //cohesion
        let d3 = dist(this.x, this.y, main.flock.list[i].x, main.flock.list[i].y);
        if (main.flock.list[i] != this && d3 < main.flock.perceptionRadius * 0.5) {
            desired3.add(main.flock.list[i].velocity);
            sum3++;
        }
    }
    if (sum1 > 0) {
        desired1.div(sum1);
        desired1.setMag(main.boid.maxSpeed);
        desired1.sub(this.velocity);
        desired1.limit(main.boid.maxForce);
        this.velocity.add(desired1);
    }
    if (sum2 > 0) {
        desired2.div(sum2);
        desired2.setMag(main.boid.maxSpeed);
        desired2.sub(this.velocity);
        desired2.limit(main.boid.maxForce);
        this.velocity.add(desired2);
    }
    if (sum3 > 0) {
        desired3.div(sum3);
        desired3.sub(this.position);
        desired3.setMag(main.boid.maxSpeed);
        desired3.sub(this.velocity);
        desired3.limit(main.boid.maxForce);
        this.velocity.add(desired3);
    }
}

Boid.prototype.edge = function () {
    if(this.x < 0) {
        this.x = main.w;
    } else if(this.x > main.w) {
        this.x = 0;
    }
    if(this.y < 0) {
        this.y = main.h;
    } else if(this.y > main.h) {
        this.y = 0;
    }
}

Boid.prototype.drawBoid = function () {
    let v = this.velocity.copy();
    v.normalize().mult(-10);
    let v1 = v.copy().rotate(0.5);
    let v2 = v.copy().rotate(-0.5);
    triangle(this.x, this.y, this.x + v1.x, this.y + v1.y, this.x + v2.x, this.y + v2.y);
}