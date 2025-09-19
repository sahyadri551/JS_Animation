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

function draw(p) {
    ctx.save();
    ctx.globalAlpha = p.op;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function updateParticle(p) {
    p.x += p.xsp;
    p.y += p.ysp;
    if (p.alpha > p.ch) {
        p.op -= p.ch;
    } else {
        p.op = 0;
    }
}

function explode(e) {
    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < n; i++){
        arr.push({
        x: x,
        y: y,
        size: Math.random() * 5 + 1,
        xsp: Math.random() * 4 - 2,
        ysp: Math.random() * 4 - 2,
        color: colors(),
        op: 1,
        ch: 0.02,
        });
    }
}

