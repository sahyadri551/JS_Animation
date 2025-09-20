let c = document.getElementById('animation');
let ctx = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;
let sound = document.getElementById('audio');

let btn2 = document.getElementById('circle');
let box = document.getElementById('box');
let btn = document.getElementById('firework');
let back = document.getElementById('back');
let animeId; 

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
    animeId = requestAnimationFrame(animate);
}


btn.addEventListener('click', () => {
    box.style.display="none";
    back.style.display="block";
    window.addEventListener('click', explode);
    animate();
});

// Animation 2

 let r = 50;
let max = 100;
let min = 50;
let sp = 0.5;
let grow = true;
let ease = 0.05; 

let x = c.width / 2;
let y = c.height / 2;

const circle = {
    x: x,
    y: y
};
const mouse = {
    x: x,
    y: y
};

window.addEventListener('mousemove', (e) => {
    const rect = c.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

function animate2() {
    ctx.clearRect(0, 0, c.width, c.height);
    const dx = mouse.x - circle.x;
    const dy = mouse.y - circle.y;
    circle.x += dx * ease;
    circle.y += dy * ease;
    if (grow) {
        r += sp;
        if (r >= max) {
            grow = false;
        }
    } else {
        r -= sp;
        if (r <= min) {
            grow = true;
        }
    }

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, r + 15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(227, 85, 206, 0.2)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, r + 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(227, 85, 206, 0.4)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, r, 0, Math.PI * 2);
    ctx.fillStyle = '#e355ce';
    ctx.fill();
    animeId = requestAnimationFrame(animate2);
}
window.addEventListener('resize', () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    x = c.width / 2;
    y = c.height / 2;
});

btn2.addEventListener('click', () => {
    box.style.display = "none";
    back.style.display = "block";
    window.removeEventListener('click', explode);
    animate2();
});

back.addEventListener('click', () => {
    cancelAnimationFrame(animeId);
    back.style.display = "none";
    box.style.display = "block";
    ctx.clearRect(0, 0, c.width, c.height);
    window.removeEventListener('click', explode);
    arr = [];
    c.removeEventListener('mousedown', startDraw);
    c.removeEventListener('mouseup', stopDraw);
    c.removeEventListener('mouseout', stopDraw);
    c.removeEventListener('mousemove', draw2);
});

//animation 3
let btn3 = document.getElementById('drawpad');
let isDraw = false;
let lastX = 0;
let lastY = 0;

function stopDraw() {
    isDraw = false;
}

function startDraw(e) {
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw2(e) {
    if (!isDraw) return;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

btn3.addEventListener('click', () => {
    console.log('clicked');
    box.style.display = 'none';
    back.style.display = 'block';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, c.width, c.height);
    c.addEventListener('mousedown', startDraw);
    c.addEventListener('mouseup', stopDraw);
    c.addEventListener('mouseout', stopDraw);
    c.addEventListener('mousemove', draw2);
});