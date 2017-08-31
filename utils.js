if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
        window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
        window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
        window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
        window.clearTimeout);
}
window.utils = {};

window.utils.captureMouse = function(element) {
    var mouse = {
        x: 0,
        y: 0
    };
    var l1 = document.body.scrollLeft, //body
        l2 = document.documentElement.scrollLeft, //html
        t1 = document.body.scrollTop,
        t2 = document.documentElement.scrollTop,
        ofX = element.scrollLeft,
        ofY = element.scrollTop;
    element.addEventListener('mousemove', function(event) {
        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + l1 + l2;
            y = event.clientY + t1 + t2;
        }
        // console.log(x,y)
        x -= ofX;
        y -= ofY;
        // console.log(ofX,ofY)

        mouse.x = x;
        mouse.y = y;
        mouse.event = event;
    });
    return mouse;
};
window.utils.parseColor = function(color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0); //chop off decimal
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
        }
        return color;
    }
};
window.utils.containsPoint = function (rect, x, y) {
  return !(x < rect.x ||
           x > rect.x + rect.width ||
           y < rect.y ||
           y > rect.y + rect.height);
};
window.utils.rectContainsPoint = function(rect, x, y) {
    return !(x < rect.x ||
        x > rect.x + rect.width ||
        y < rect.y ||
        y > rect.y + rect.height);
};
window.utils.ellipseContainsPoint = function(x, y, centerX, centerY, eW, eH) {
    if (Math.pow((x - centerX * .5), 2) / Math.pow(eW, 2) + Math.pow((y - centerY * .5), 2) / Math.pow(eH, 2) < 1) {
        return true
    }
    return false;
};
window.utils.getNumberInNormalDistribution = function(mean, std_dev) { // 正态分布 两头少 中间多
    function randomNormalDistribution() {
        var u = 0.0,
            v = 0.0,
            w = 0.0,
            c = 0.0;
        do {
            u = Math.random() * 2 - 1.0;
            v = Math.random() * 2 - 1.0;
            w = u * u + v * v;
        } while (w == 0.0 || w >= 1.0)
        c = Math.sqrt((-2 * Math.log(w)) / w);
        return u * c;
    }
    return mean + (randomNormalDistribution() * std_dev);
}
window.utils.getBezierCoordinates = function($t) {}

