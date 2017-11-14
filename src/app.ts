import "p2";
import "pixi";
import "phaser";

type Body = Phaser.Physics.Arcade.Body;

let game: Phaser.Game;
let player: Phaser.Sprite;
let playerCollider: Phaser.Sprite;
let cursors: Phaser.CursorKeys;
let map: Phaser.Tilemap;
let layer: Phaser.TilemapLayer;
let ores: Phaser.Group;

window.onload = function () {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {
        game.load.spritesheet("hero", "assets/hero.png", 16, 16);
        game.load.spritesheet("crystal-cave", "assets/crystal-cave.png", 32, 32);
        game.load.image("a2", "assets/a2.png");
        game.time.advancedTiming = true;
    }

    function create() {
        // Setup tilemap
        map = game.add.tilemap();
        map.addTilesetImage("a2");
        layer = map.create("level", 50, 30, 32, 32);
        layer.resizeWorld();
        map.fill(0, 0, 0, 50, 30, layer);
        for (let i = 0; i < 50; i++) {
            let tilePlaced = false;
            while (!tilePlaced) {
                let x = Math.floor(Math.random() * 50);
                let y = Math.floor(Math.random() * 30);
                console.log("X", x, "Y", y);
                let tile = map.getTile(x, y);
                console.log("Tile", tile);
                if (tile.index != 146) {
                    map.putTile(146, x, y);
                    tilePlaced = true;
                }
            }
        }

        // Groups setup
        ores = game.add.group();

        // Setup player
        player = game.add.sprite(250, 400, "hero", 7);
        player.scale.setTo(2, 2);
        player.anchor.setTo(0.5, 0.5);
        player.smoothed = false;
        player.animations.add("left", [0, 1, 2], 10, true);
        player.animations.add("up", [3, 4, 5], 10, true);
        player.animations.add("down", [6, 7, 8], 10, true);

        playerCollider = game.add.sprite();
        playerCollider.anchor.setTo(0.5, 0.5);
        playerCollider.scale.setTo(1.1, 1.1);
        player.addChild(playerCollider);

        // Physics and collision
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable([player, playerCollider]);
        (<Body>player.body).collideWorldBounds = true;

        // Setup keyboard arrow keys.
        cursors = game.input.keyboard.createCursorKeys();

        // Ores
        let tile = map.getTile(5, 10);
        let ore: Phaser.Sprite = ores.create(tile.worldX, tile.worldY, "crystal-cave", 7);
        game.physics.arcade.enable(ore);
        ore.body.immovable = true;
        ore.inputEnabled = true;

        ore.events.onInputDown.add(listener, this);
    }

    function update() {
        let walkingVelocity = 125;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        game.physics.arcade.collide(player, ores);

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

    function render() {
        game.debug.text(String(game.time.fps) || "--", 4, 16, "#f00");
        // game.debug.body(player);
        // game.debug.body(ores.getBottom());
        // game.debug.body(playerCollider, "#0000ff", false);
    }

    function listener(clickedOre: Phaser.Sprite) {
        console.log("Clicked ore", clickedOre);
        console.log("Player Collider", playerCollider);
        let overlap = game.physics.arcade.overlap(clickedOre, playerCollider);
        console.log("Overlap", overlap);
    }
};

window.onresize = function (event) {
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
};