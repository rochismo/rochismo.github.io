function Enemy(x,y,r, handler) {
    this.pos = createVector(x,y);
    this.tempPos = this.pos;
    this.handler = handler;
    this.initialPos = createVector(this.pos.x, this.pos.y);
    this.r = r;
    this.rainbow = color(random(255),random(255),random(255));
    this.vel = createVector(
        (this.pos.x < 0) ? Math.random(): Math.random() * -1,
        (this.pos.y < 0) ? Math.random(): Math.random() * -1
    );

    this.show = function () {
        push();
        fill(this.rainbow);
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
        pop();
    };

    this.update = function(){
        this.pos.add(this.vel);
        this.tempPos = this.pos;
    };

    this.getOutOfBounds = function () {
        if (this.initialPos.x < 0 && this.initialPos.y < 0) {
            return this.pos.x > (window.innerWidth * 2) + this.handler.player.pos.x ||
                this.pos.y > (window.innerHeight * 2) + this.handler.player.pos.y;
        } else {
            return this.pos.x < (-window.innerWidth * 2) - this.handler.player.pos.x ||
                this.pos.y < (-window.innerHeight * 2) - this.handler.player.pos.y;
        }
    };
    this.stop = function(){
        this.pos = this.tempPos;
    };

    this.displayDeadText = function () {
        this.player = null;
        this.enemies = [];
        fill(255);
        var txt = "You died, press Space to play again";
        console.log("Current player position: " + this.pos);
        console.log("Spawning text at: " + this.pos.x + this.pos.y);
        text(txt, this.pos.x / 2, this.pos.y / 2);
    };
}