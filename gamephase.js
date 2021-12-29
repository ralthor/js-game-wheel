export const GameState = {
    Start: "Game Start",
    GameOver: "Game Over",
    Running: "Game Running"
};

export class GamePhase {
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
        this.newState = false;
        let currentObject = this;
        console.log(`Game phase is changing to ${this.name}`)
        this.keyboardEvent = function(event) {
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
        if (this.newState) {
            console.log("Yes! Starting the game!")
            return this.newState;
        }
        return false;
    }
}