var game = {
    player: null,
    enemies: [],
    maxEnemies: 200,
    playerStartingRadius: 20,
    haveToScale: false,
    handler: null,
    paused: false
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    initGame();
}

function initGame() {
    game.player = new Player(
        innerWidth / 2, innerHeight / 2,
        game.playerStartingRadius
    );

    game.handler = new Handler(game.player, game.enemies);
    genEnemies(game.maxEnemies);
    game.handler.enemies = game.enemies;
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    translate(-game.handler.player.pos.x, -game.handler.player.pos.y);
    if (game.handler.player.alive){
        if (game.paused){
            game.handler.pause();
        } else {
            game.handler.init();
        }
    } else {
        game.handler.displayDeadText();
    }
}

function keyPressed() {
    if (!game.handler.player.alive){
        if (keyCode === 32){
            initGame();
            return;
        }
    }
    if (keyCode === 32 && !game.paused && game.player.alive){
        game.paused = true;
    } else if (keyCode === 32 && game.paused && game.player.alive){
        game.paused = false;
    }
}

function genEnemies(quantity) {
    for (var i = 0; i < quantity; i++) {
        var r = random(game.player.radius / 2, game.player.radius + game.player.radius / 2);
        var x = Math.random() < 0.50 ?
            random(0, -window.innerWidth - game.handler.player.pos.x) - r :
            random(game.handler.player.pos.x + window.innerWidth * 2, window.innerWidth + game.handler.player.pos.x) + r;
        var y = Math.random() < 0.50 ?
            random(0, -window.innerHeight - game.handler.player.pos.y) - r :
            random(game.handler.player.pos.y + window.innerHeight * 2, game.handler.player.pos.y + window.innerHeight) + r;
        game.enemies.push(new Enemy(x, y, r, game.handler));
    }
}