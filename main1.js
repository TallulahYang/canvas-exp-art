function Target(x, y, radius, color) {
    this.x = x ? x : canvas.width / 2;
    this.y = y ? y : canvas.height / 2;
    this.ox = x;
    this.oy = y;
    this.radius = radius ? radius : 30;
    this.color = (color === undefined) ? "#ff0000" : utils.parseColor(color);
}
Target.prototype.update = function(t){
    this.x = this.ox * (Math.sin(t / 100) + 1) * 0.5;
    this.y = this.oy * (Math.sin(t / 100) + 1) * 0.5;
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

function heartPosition(phi) {
    return [Math.pow(Math.sin(phi), 3) *150, - 10* ( (15 * Math.cos(phi) - 5 * Math.cos(2 * phi) - 2 * Math.cos(3 * phi) - Math.cos(4 * phi)))];
}

var targets = [];
for (var phi = 0; phi < Math.PI * 2; phi += 0.1) {
    targets.push(new Target(heartPosition(phi)[0] , heartPosition(phi)[1] , 10));
}

ctx.fillRect(0, 0, canvas.width, canvas.height);
render();

var t = 0;
function render() {
    requestAnimationFrame(render);
    ctx.fillStyle = 'rgba(0, 0,0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    t ++;

    ctx.save();
    // update();
    // particle.draw(ctx);
    // target.draw(ctx);
    ctx.translate(canvas.width / 2, canvas.height / 2)
    targets.forEach(function (target) {
        target.update(t);
        target.draw(ctx);
    });

    ctx.restore();
}
function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}
window.addEventListener("resize", resize);