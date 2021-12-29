import { Cube, Earth, Bar } from "./objects";

export const GameState = {
    Start: "Game Start",
    GameOver: "Game Over",
    Running: "Game Running"
};

class GamePhase {
    constructor(name, coreObject, graphicsObject) {
        console.log(`creating game state: ${name}`);
        this.name = name;
        this.core = coreObject;
        this.graphics = graphicsObject;
    }

    changeTo() {
        console.log(`Game state is changed to ${this.name}`);
    }

    release() {
        console.log(`Going out of game state ${this.name}`);
    }

    tick() {
        console.log(`tick should be defined for game state ${this.name}`)
    }
}

export class BeforeStart extends GamePhase {
    constructor(name, coreObject, graphicsObject) {
        super(name, coreObject, graphicsObject);
        this.newState = false;
    }

    changeTo() {
        let currentObject = this;
        console.log(`Game phase is changing to ${this.name}`)
        this.keyboardEvent = function(event) {
            console.log(event);
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 32:
                    console.log("NOW STARTING THE GAME!!!");
                    currentObject.newState = GameState.Running;
                    console.log(currentObject.newState);
                    break;
                default:
                    console.log(`key pressed is ${keyCode}`);
            }
        }
        document.addEventListener("keydown", this.keyboardEvent);
    }

    release() {
        console.log(`Game phase release ${this.name}`)
        document.removeEventListener("keydown", this.keyboardEvent);
    }

    tick() {
        // console.log(this.newState)
        if (this.newState) {
            console.log("Yes! Starting the game!")
            return this.newState;
        }
        return false;
    }
}

export class Running extends GamePhase {
    constructor(name, coreObject, graphicsObject) {
        super(name, coreObject, graphicsObject);
        this.newState = false;
        this.environmentCreated = false;
    }

    createEnvironment() {
        let earth = new Earth("Earth");
        this.graphics.scene.add(earth.object());

        let cube = new Cube("cube 1");
        this.graphics.scene.add(cube.object());

        this.core.addObject(cube);

        for (let i = 0; i < 8; i++) {
            let bar = new Bar("bar " + i, 15 + i * 5);
            this.graphics.scene.add(bar.object());
            this.core.addObject(bar);
        }
        this.environmentCreated = true;
    }

    changeTo() {
        this.createEnvironment();

        this.keyboardEvent = function(event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 32:
                    console.log("Jump!");
                    break;
                case 27:
                    console.log("Exit!");
                    this.newState = GameState.GameOver;
                default:
                    console.log(`key pressed is ${keyCode}`);
            }
        }
        document.addEventListener("keydown", this.keyboardEvent);
    }

    release() {
        document.removeEventListener("keydown", this.keyboardEvent);
    }

    tick() {
        // TODO: check for collision, if happened change the game state
        if (this.newState)
            return this.newState;
        return false;
    }
}