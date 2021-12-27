import { Graphics } from "./graphics";
import { Cube, Core } from "./core";

let graphic = new Graphics()
let cube = new Cube("cube 1");
graphic.scene.add(cube.object());

let core = new Core(graphic)
core.addObject(cube);
core.tick();