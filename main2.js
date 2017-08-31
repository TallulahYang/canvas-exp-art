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
var targetIndexDirection = 1;
resize();

function heartPosition(phi) {
    return [Math.pow(Math.sin(phi), 3) *150, - 10* ( (15 * Math.cos(phi) - 5 * Math.cos(2 * phi) - 2 * Math.cos(3 * phi) - Math.cos(4 * phi)))];
}
function circle(phi){
    return [Math.sin(phi) * 150, Math.cos(phi) * 200];
}
function gain(x, k) 
{
    k = k ? k : 1;
    var a = 0.5*Math.pow(2.0*((x<0.5)?x:1.0-x), k);
    return [((x<0.5)?a:1.0-a) * 50, ((x<0.5)?a:1.0-a)*10];
}
function parabola(  x,  k )
{
     k = k ? k : 1;
    var x = y =  Math.pow( 4.0*x*(1.0-x), k ) ;
    return [x * 10 + 500,y * 100];
}
function impulse(  k,  x )
{   
    k = k ? k : 1;
    var  h = k*x;
    var x = y =  h* Math.exp(1.0-h);
    return [Math.random() * 1000 - 500 , y * 200];
}

var targets = [];
for (var phi = 0; phi < Math.PI * 2; phi += 0.1) {
    targets.push(new Target(heartPosition(phi)[0] + canvas.width / 2, heartPosition(phi)[1] + canvas.height / 2, 10));
}
var targetIndex = randint(0, targets.length);
var particle = new Target(targets[targetIndex].x, targets[targetIndex].y, 15, '#00ff00');
var target = new Target(targets[targetIndex].x, targets[targetIndex].y, 15, '#0000ff');

ctx.fillRect(0, 0, canvas.width, canvas.height);
render();
function render() {
    requestAnimationFrame(render);
    ctx.fillStyle = 'rgba(0, 0,0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    update();
    particle.draw(ctx);

    target.x = targets[targetIndex].x;
    target.y = targets[targetIndex].y;
    target.draw(ctx);

    targets.forEach(function (target) {
        target.draw(ctx);
    });

    ctx.restore();
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


    var amountOfParticles = targets.length;
    
    if (length<15) {
        if (Math.random()>0.96) {
            targetIndex = Math.floor(Math.random() * amountOfParticles);
        } else {
            if (Math.random()>0.99) {
                targetIndexDirection *= -1;
            }
            targetIndex += targetIndexDirection;
            targetIndex %= amountOfParticles;
            if (targetIndex<0) {
                targetIndex += amountOfParticles;
            }
        }
    }

};

function resize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}
window.addEventListener("resize", resize);