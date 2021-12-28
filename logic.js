import { GameObject } from "./objects";
import { Cube, Earth, Bar } from "./objects";

const GameState = {
    Start: "Game Start",
    GameOver: "Game Over",
    Running: "Game Running"
};

export class Logic extends GameObject {
    constructor(name, coreObject, graphicsObject) {
        super(name);
        this.core = coreObject;
        this.graphic = graphicsObject;
        this.startRunning()
    }

    startRunning() {
        this.state = GameState.Running;

        let earth = new Earth("Earth");
        this.graphic.scene.add(earth.object());

        let cube = new Cube("cube 1");
        this.graphic.scene.add(cube.object());

        this.core.addObject(cube);

        for (let i = 0; i < 8; i++) {
            let bar = new Bar("bar " + i, 15 + i * 5);
            this.graphic.scene.add(bar.object());
            this.core.addObject(bar);
        }

    }

    tick() {

    }
}