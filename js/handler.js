function Handler(player, enemies) {
    this.player = player;
    this.enemies = enemies;
    this.scoreFontSize = 32;
    this.pauseTextSize = 40;

    this.init = function () {
        this.initPhysics();
        this.display();
    };

    this.showEnemies = function () {
        for (var i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].update();
            this.enemies[i].show();
            if (this.enemies[i].getOutOfBounds()) {
                this.enemies.splice(i, 1);
                genEnemies(1);
            }
        }
    };

    this.display = function () {
        this.player.update();
        this.player.show();
        this.showEnemies();
    };

    this.initPhysics = function () {
        for (var i = this.enemies.length - 1; i >= 0; i--) {
            if (this.player.eats(this.enemies[i])) {
                if (this.player.radius > this.enemies[i].r){
                    this.player.radius += 2;
                    this.player.score++;
                } else {
                    this.player.alive = false;
                }
                this.enemies.splice(i, 1);
                genEnemies(1);
            }
        }
    };


    this.displayDeadText = function () {
        textSize(this.scoreFontSize);
        fill(255);
        var txt = "You died, press Space to play again. Your score was: " + this.player.score;
        text(txt, this.player.pos.x - ((innerWidth) - (txt.length * 2.5)) / 4, this.player.pos.y);
        game.enemies = [];
        game.player = null;
    };
    
    this.pause = function () {
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].stop();
        }
        this.player.stop();
        textSize(this.pauseTextSize);
        fill(255);
        text("PAUSED", this.player.pos.x - (this.pauseTextSize * 2), this.player.pos.y);
    };

}