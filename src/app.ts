import "p2";
import "pixi";
import "phaser";

let game: Phaser.Game;
let player: Phaser.Sprite;
let cursors: Phaser.CursorKeys;

window.onload = function () {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        game.load.spritesheet("hero", "assets/hero.png", 16, 16);
    }

    function create() {
        player = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, "hero", 7);
        player.scale.setTo(2, 2);
        player.anchor.setTo(0.5, 0.5);
        player.smoothed = false;
        player.animations.add("left", [0, 1, 2], 10, true);
        player.animations.add("up", [3, 4, 5], 10, true);
        player.animations.add("down", [6, 7, 8], 10, true);

        game.physics.arcade.enable(player);
        let body: Phaser.Physics.Arcade.Body;
        body = player.body;
        body.collideWorldBounds = true;

        game.stage.backgroundColor = "#aaa";

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        let walkingVelocity = 125;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown) {
            // player.x -= 2;
            player.body.velocity.x = -walkingVelocity;
            player.animations.play("left");
            if (player.scale.x < 0) {
                player.scale.x *= -1;
            }
        } else if (cursors.right.isDown) {
            // player.x += 2;
            player.body.velocity.x = walkingVelocity;
            player.animations.play("left");
            if (player.scale.x > 0) {
                player.scale.x *= -1;
            }
        } else if (cursors.down.isDown) {
            // player.y += 2;
            player.body.velocity.y = walkingVelocity;
            player.animations.play("down");
        } else if (cursors.up.isDown) {
            // player.y -= 2;
            player.body.velocity.y = -walkingVelocity;
            player.animations.play("up");
        } else {
            player.animations.stop();
            player.frame = 7;
        }
    }
};

window.onresize = function (event) {
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
};