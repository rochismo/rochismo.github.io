function Player(x, y, startingRadius) {
    this.pos = createVector(x, y);
    this.radius = startingRadius;
    this.color = "#fff";
    this.score = 0;
    this.alive = true;
    this.tempPos = this.pos;
    this.scoreFontSize = 32;

    this.show = function () {
        push();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        pop();
    };

    this.update = function () {
        var newvel = createVector(mouseX-width/2, mouseY-height/2);
        newvel.setMag(3);
        this.pos.add(newvel);
        this.displayScore();
    };

    this.eats = function (enemy) {
        var d = this.getRelativeDist(enemy);
        return (d <= (enemy.r / 2) + (this.radius / 2));
    };

    this.getRelativeDist = function(enemy){
        var vec = {x:enemy.pos.x - this.pos.x, y: enemy.pos.y - this.pos.y};
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    };

    this.stop = function () {
        this.pos = this.tempPos;
    };

    this.displayScore = function () {
        textSize(this.scoreFontSize);
        fill(255);
        text("Score: " + this.score, this.pos.x - (width/ 2 - this.scoreFontSize / 2), this.pos.y - (height / 2 - (this.scoreFontSize * 2) / 2))  ;
    };


}