var canvas          = require("./canvas");

var hud = {

    positionUnits: Math.floor(canvas.width / 16),
    smallFontSize: 24,
    largeFontSize: 48,
    padding: 8,
    textColor: "white",
    fontFamily: "monospace"
};

hud.drawScore = (function() {
    "use strict";
    var xL = this.positionUnits * 2,
        xR = this.positionUnits * 5,
        y = this.padding + this.smallFontSize,
        font = `${this.smallFontSize}px ${this.fontFamily}`,
        label = "Score";

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "left";
        ctx.fillText(label, xL, y);
        ctx.textAlign = "right";
        ctx.fillText(val, xR, y);
        ctx.restore();
    };
}());

hud.drawHiScore = (function() {
    "use strict";
    var xL = canvas.width - this.positionUnits * 5,
        xR = canvas.width - this.positionUnits * 2,
        y = this.padding + this.smallFontSize,
        font = `${this.smallFontSize}px ${this.fontFamily}`,
        label = "HiScore";

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "left";
        ctx.fillText(label, xL, y);
        ctx.textAlign = "right";
        ctx.fillText(val, xR, y);
        ctx.restore();
    };
}());

hud.drawTime = (function() {
    "use strict";
    var x = canvas.width / 2,
        y = this.padding + this.largeFontSize,
        font = `${this.largeFontSize}px ${this.fontFamily}`;

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "center";
        ctx.fillText(val, x, y);
        ctx.restore();
    };
}());

hud.drawMultiplier = (function() {
    "use strict";
    var x = canvas.width - this.smallFontSize,
        y = canvas.height - this.largeFontSize - this.smallFontSize,
        font = `${this.largeFontSize}px ${this.fontFamily}`;

    return function(val) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "right";
        ctx.fillText(`x${val}`, x, y);
        ctx.restore();
    };
}());

hud.drawPellets = (function() {
    "use strict";
    var x = canvas.width - this.smallFontSize - this.smallFontSize,
        y = canvas.height - this.smallFontSize,
        font = `${this.smallFontSize}px ${this.fontFamily}`,
        pelletColor = "gold",
        xP = canvas.width - this.smallFontSize - this.smallFontSize + 4,
        yP = canvas.height - this.smallFontSize - 16,
        wP = 16;

    return function(playerPellets, scenePellets) {
        var ctx = canvas.ctx;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "right";
        ctx.fillText(`${playerPellets} / ${scenePellets}`, x, y);
        ctx.fillStyle = pelletColor;
        ctx.fillRect(xP, yP, wP, wP);
        ctx.restore();
    };
}());

hud.draw = function(scoreTracker, playerPellets, scenePellets) {
    "use strict";
    canvas.ctx.fillStyle = this.textColor;

    this.drawScore(scoreTracker.score);
    //this.drawHiScore(scoreTracker.getHiScore);
    this.drawTime(scoreTracker.timeRemaining);
    this.drawMultiplier(scoreTracker.multiplier);
    this.drawPellets(playerPellets, scenePellets);
};

module.exports = hud;