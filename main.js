function Target(x, y, radius, color) {
    this.x = x ? x : canvas.width / 2;
    this.y = y ? y : canvas.height / 2;
    this.ox = x;
    this.oy = y;
    this.radius = radius ? radius : 30;
    this.color = (color === undefined) ? "#ff0000" : utils.parseColor(color);
}

Target.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
};

Target.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
    };
};


var canvas = document.getElementById('demo');
var ctx = canvas.getContext("2d");
var mouse = utils.captureMouse(canvas);
var speed = 20,
    friction = 0.7;

resize();

var particle = new Target(0,0, 5, '#ff0000');
var target = new Target(0, 0, 15, '#0000ff');

ctx.fillRect(0, 0, canvas.width, canvas.height);
render();
function render() {
    requestAnimationFrame(render);
    ctx.fillStyle = 'rgba(0, 0,0, 0.81)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    update();
    particle.draw(ctx);
    target.draw(ctx);
    ctx.restore();
}
function update() {
    var dx = particle.x - target.x;
    var dy = particle.y - target.y;
    // var angle = Math.atan2(-dy, -dx);
    // var vx = Math.cos(angle) * speed;
    // var vy = Math.sin(angle) * speed;

    var length = Math.sqrt(dx * dx + dy * dy + 100);
    var vx = -dx / length * 6;
    var vy = -dy / length * 6;

    particle.x += vx;
    particle.y += vy;

    vx *= friction;
    vy *= friction;
};

function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}
window.addEventListener("resize", resize);

canvas.addEventListener('mousedown', function () {
    if (utils.containsPoint(target.getBounds(), mouse.x, mouse.y)) {
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
    }
}, false);

function onMouseUp() {
    canvas.removeEventListener('mouseup', onMouseUp, false);
    canvas.removeEventListener('mousemove', onMouseMove, false);
}

function onMouseMove(event) {
    target.x = mouse.x;
    target.y = mouse.y;
}