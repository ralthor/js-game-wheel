import { Graphics } from "./graphics";
import { Core } from "./core";
import { Cube, Earth, Bar } from "./objects";


let graphic = new Graphics()

let earth = new Earth("Earth");
graphic.scene.add(earth.object());

let cube = new Cube("cube 1");
graphic.scene.add(cube.object());

let core = new Core(graphic)
core.addObject(cube);

for (let i = 0; i < 8; i++) {
    let bar = new Bar("bar " + i, 15 + i * 5);
    graphic.scene.add(bar.object());
    core.addObject(bar);
}

core.tick();