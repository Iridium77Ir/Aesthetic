function Node(x, y, linkedNodeList) {
    this.posx = x;
    this.posy = y;
    this.prevx = x;
    this.prevy = y;
    this.r = 20;

    this.linkedNodes = linkedNodeList;

    this.dragged = false;
    this.offsetX = 0;
    this.offsetY = 0;
};

Node.prototype.draw = function () {
    if(this.dragged) {
        this.updateDirect(mouseX, mouseY);
    };

    this.updateIndirect();
    
    ellipse(this.posx, this.posy, this.r*2);
    for(var i = 0; i < this.linkedNodes.length; i++) {
        line(this.posx, this.posy, this.linkedNodes[i].posx, this.linkedNodes[i].posy)
    };

    this.prevx = this.posx;
    this.prevy = this.posy;
};

Node.prototype.mouseInRange = function (mx, my) {
    if(dist(mx, my, this.posx, this.posy) < this.r) {
        return true;
    } else {
        return false;
    };
};

Node.prototype.clicked = function () {
    if(this.mouseInRange(mouseX, mouseY)) {
        this.dragged = true;
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
    };
}

Node.prototype.released = function () {
    this.dragged = false;
}

Node.prototype.updateDirect = function (x, y) {
    this.posx = x;
    this.posy = y;
};

Node.prototype.updateIndirect = function() {
    for(var i = 0; i < this.linkedNodes.length; i++) {
        var tn = this.linkedNodes[i];
        var on = this;
        
        var dist = abs((on.posx - tn.posx)*(on.posx - tn.posx) + (on.posy - tn.posy)*(on.posy - tn.posy));
        if(dist < 120000) {
            var delta = (1/10000000000)*((dist-62000)*(dist-62000)) + 0.01;
        } else {
            var delta = 0.1;
        };

        if(dist < (200)*(200)) {
            var fDistance = Math.sqrt((on.posx+tn.posx)*(on.posx+tn.posx)+(on.posy+tn.posy)*(on.posy+tn.posy));
            var fOverlap = 0.5 * (fDistance - on.r - tn.r);
    
            on.posx += delta * fOverlap * (on.posx - tn.posx) / fDistance;
            on.posy += delta * fOverlap * (on.posy - tn.posy) / fDistance;
    
            tn.posx -= delta * fOverlap * (on.posx - tn.posx) / fDistance;
            tn.posy -= delta * fOverlap * (on.posy - tn.posy) / fDistance;
        } else if (dist > (250)*(250)) {
            var fDistance = Math.sqrt((on.posx+tn.posx)*(on.posx+tn.posx)+(on.posy+tn.posy)*(on.posy+tn.posy));
            var fOverlap = 0.5 * (fDistance - on.r - tn.r);
    
            on.posx -= delta * fOverlap * (on.posx - tn.posx) / fDistance;
            on.posy -= delta * fOverlap * (on.posy - tn.posy) / fDistance;
    
            tn.posx += delta * fOverlap * (on.posx - tn.posx) / fDistance;
            tn.posy += delta * fOverlap * (on.posy - tn.posy) / fDistance;
        }
    };
};