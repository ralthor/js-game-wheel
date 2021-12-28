import { Graphics } from "./graphics";
import { Core } from "./core";
import { Logic } from "./logic";


let graphic = new Graphics();
let core = new Core(graphic);
let logic = new Logic("Game logic", core, graphic);

core.addObject(logic);

core.tick();