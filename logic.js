import { GameObject } from "./objects";
import { GameState, BeforeStart, Running } from "./gamephase";

export class Logic extends GameObject {
    constructor(name, coreObject, graphicsObject) {
        super(name);
        this.core = coreObject;
        this.graphics = graphicsObject;
        this.availablePhase = {
            [GameState.Start]: new BeforeStart(GameState.Start, this.core, this.graphics),
            [GameState.Running]: new Running(GameState.Running, this.core, this.graphics)
        }
        this.startRunning()
    }

    startRunning() {
        this.state = GameState.Start;
        this.phase = this.availablePhase[GameState.Start];
        this.phase.changeTo();
    }

    tick() {
        let nextPhase = this.phase.tick();
        if (nextPhase) {
            this.phase.release();
            this.phase = this.availablePhase[nextPhase];
            this.phase.changeTo();
        }
    }
}