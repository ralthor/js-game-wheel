import { GamePhase, GameState } from "./gamephase";
import { Cube, Earth, Bar } from "./objects";


export class Running extends GamePhase {
    constructor(name, coreObject, graphicsObject) {
        super(name, coreObject, graphicsObject);
        this.newState = false;
        this.environmentCreated = false;
    }

    setEnvironment() {
        if (this.environmentCreated)
            return;
        let earth = new Earth("Earth");
        this.graphics.scene.add(earth.object());

        this.bird = new Cube("bird");
        this.graphics.scene.add(this.bird.object());

        this.core.addObject(this.bird);

        for (let i = 0; i < 8; i++) {
            let bar = new Bar("bar " + i, 15 + i * 5);
            this.graphics.scene.add(bar.object());
            this.core.addObject(bar);
        }
        this.environmentCreated = true;
        this.newState = false;
    }

    changeTo() {
        this.setEnvironment();
        this.newState = false;
        let currentObject = this;

        this.keyboardEvent = function(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 32:
                    console.log("Jump!");
                    currentObject.bird.speed.y = -2;
                    break;
                case 27:
                    console.log("Exit!");
                    currentObject.newState = GameState.Start;
                    break;
                default:
                    console.log(`key pressed is ${keyCode}`);
            }
        }
        document.addEventListener("keydown", this.keyboardEvent);
    }

    release() {
        console.log(`releasing game phase ${this.name}`)
        document.removeEventListener("keydown", this.keyboardEvent);
    }

    tick() {
        // TODO: check for collision, if happened change the game state
        if (this.newState)
            return this.newState;
        return false;
    }
}