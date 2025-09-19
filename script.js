let c = document.getElementById('animation');
let ctx = c.getContext('2d');

let arr = [];
let n=100;

function colors(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`;
}

function draw(particle) {
    ctx.save();
    ctx.globalAlpha = particle.op;
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

