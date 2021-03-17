var w = 1900, h = 970;

var bgc = '#000';

var nodes = [];
function setupNodes() {
    var node1 = new Node(100, 100, []);
    var node2 = new Node(200, 200, [node1])
    var node3 = new Node(100, 100, [node2]);
    var node4 = new Node(400, 400, [node1, node3])
    var node5 = new Node(100, 400, []);
    var node6 = new Node(300, 300, [node4, node5])
    nodes.push(node1, node2, node3, node4, node5, node6);
};

function setup() {
    createCanvas(w, h);
    setupNodes();
    stroke(255, 204, 0);
    strokeWeight(4);
}

function draw() {
    background(bgc);

    for(var i = 0; i < nodes.length; i++) {
        nodes[i].draw();
    };
};

function mousePressed() {
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].clicked();
    };
};
function mouseReleased() {
    for(var i = 0; i < nodes.length; i++) {
        nodes[i].released();
    };
};