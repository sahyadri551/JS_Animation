// script.js

let c = document.getElementById('animation');
let ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
let sound = document.getElementById('audio');
            
let arr = [];
let n = 100;

function colors() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
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

function update(p) {
    p.x += p.xsp;
    p.y += p.ysp;
    if (p.op > p.ch) {
        p.op -= p.ch;
    } else {
        p.op = 0;
    }
}

function explode(e) {
    sound.currentTime = 0; 
    sound.play();

    const x = e.clientX;
    const y = e.clientY;

    for (let i = 0; i < n; i++) {
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

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, c.width, c.height);
    for (let i = arr.length - 1; i >= 0; i--) {
        let p = arr[i];
        draw(p);
        update(p);
        if (p.op <= 0) {
            arr.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('click', explode);
window.addEventListener('resize', () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});

animate();