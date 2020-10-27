var main = {
    w: window.innerWidth,
    h: window.innerHeight,
    bgc: 11,
    flock: {
        size: 200,
        list: [],
        perceptionRadius: 100
    },
    boid: {
        col: [43, 199, 255, 1],
        maxForce: 0.1,
        maxSpeed: 5
    },
    noise: {
        scale: 0.01,
        influence: 0.05
    }
}