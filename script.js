import { Graphics } from "./graphics";
import { Core } from "./core";
import { Cube, Earth } from "./objects";

let graphic = new Graphics()
let cube = new Cube("cube 1");
graphic.scene.add(cube.object());

let earth = new Earth("Earth");
graphic.scene.add(earth.object());

let core = new Core(graphic)
core.addObject(cube);
core.tick();