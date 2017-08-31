function Target(x, y, radius, color) {
    this.x = x ? x : canvas.width / 2;
    this.y = y ? y : canvas.height / 2;
    this.ox = x;
    this.oy = y;
    this.radius = radius ? radius : 30;
    this.color = (color === undefined) ? "#ff0000" : utils.parseColor(color);
}

var unitet = unitat = 20 + Math.random() * 10;
Target.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    // unit = this.x ;
    // unity = this.y ;
    // ctx.moveTo(unit + 0.5 * unitat, unity + 0.3 * unitet);
    // ctx.beginPath();
    // ctx.moveTo(unit + 0.5 * unitat, unity + 0.3 * unitet);
    // ctx.bezierCurveTo(unit + 0.1 * unitat, unity, unit,
    //     unity + 0.6 * unitet, unit + 0.5 *
    //     unitat, unity + 0.9 * unitet);
    // ctx.bezierCurveTo(unit + 1 * unitat, unity + 0.6 *
    //     unitet, unit + 0.9 * unitat, unity,
    //     unit + 0.5 * unitat,
    //     unity + 0.3 * unitet);
    // ctx.closePath();
    // ctx.fill();
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


var particle = new Target(0, 0, 10);
var target = new Target(0, 0, 30, '#0000ff');

trace = [];
for (var i = 0; i < 100; i++) {
    trace[i] = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
}
// ctx.fillRect(0, 0, canvas.width, canvas.height);
render();
function render() {
    requestAnimationFrame(render);
    ctx.fillStyle = 'rgba(0, 0,0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ctx.save();
    update();
    particle.draw(ctx);
    target.draw(ctx);

    // ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
    trace.forEach(function (item) {
        ctx.fillStyle = '#ff0000';
        // ctx.fillStyle = "rgba(254, 254, 254, 0.01)";
        ctx.beginPath();
        ctx.arc(item.x, item.y, 5, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.fillRect(item.x, item.y, 2, 2);
    });

    // ctx.restore();
}
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
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

    particle.x = target.x;
    particle.y = target.y;

    trace[0].x = particle.x;
    trace[0].y = particle.y;
    const traceStep = 0.4;

    trace.forEach(function (current, index, array) {
        if (index === array.length - 1) return;
        var next = array[index + 1];
        // console.log(next)
        next.x -= traceStep * (next.x - current.x);
        next.y -= traceStep * (next.y - current.y);
    });
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