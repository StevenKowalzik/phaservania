import makeAnimations from "../helpers/animations";

class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "BootScene"
        });
    }
    preload() {
        this.load.image("loading", "assets/sprites/loading.png");

        const progress = this.add.graphics();

        // Register a load progress event to show a load bar
        this.load.on("progress", value => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(
                0,
                this.sys.game.config.height / 2,
                this.sys.game.config.width * value,
                60
            );
        });

        // Register a load complete event to launch the title screen when all files are loaded
        this.load.on("complete", () => {
            // prepare all animations, defined in a separate file
            makeAnimations(this);
            progress.destroy();
        });

        // load title screen
        this.load.image("title", "assets/sprites/title-screen.png");
        this.load.image("game-over", "assets/sprites/game-over.png");
        this.load.image("enter", "assets/sprites/press-enter-text.png");
        this.load.image("credits", "assets/sprites/credits-text.png");
        this.load.image("instructions", "assets/sprites/instructions.png");
        // environment
        this.load.image("bg-moon", "assets/environment/bg-moon.png");
        this.load.image("bg-mountains", "assets/environment/bg-mountains.png");
        this.load.image("bg-graveyard", "assets/environment/bg-graveyard.png");
        // tileset
        this.load.image("tileset", "assets/environment/tileset.png");
        this.load.tilemapTiledJSON("map", "assets/maps/map.json");
        this.load.image("objects", "assets/environment/objects.png");
        // atlas sprite
        this.load.atlas(
            "atlas",
            "assets/atlas/atlas.png",
            "assets/atlas/atlas.json"
        );
        this.load.atlas(
            "atlas-props",
            "assets/atlas/atlas-props.png",
            "assets/atlas/atlas-props.json"
        );
        // audio
        this.load.audio("music", [
            "assets/audio/sci_fi_platformer04_main_loop.ogg"
        ]);
    }

    create() {
        let bgmusic = this.sound.add("music");

        bgmusic.play({
            volume: 1,
            loop: true
        })
    }
}

export default BootScene;
