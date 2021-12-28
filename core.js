import * as THREE from 'three'
import { GameObject } from './objects'

class FrameRateReporter extends GameObject {
    tick(frameTime, elapsedTime) {
        const previousTime = elapsedTime - frameTime;
        if (Math.floor(elapsedTime) != Math.floor(previousTime))
            console.log(1.0 / frameTime);
    }
}

export class Core {
    constructor(graphics) {
        this.graphics = graphics;
        this.clockHandler();
        this.objects = new Array();
        this.addObject(new FrameRateReporter("FrameRate reporter"));
    }

    clockHandler() {
        this.clock = new THREE.Clock();
        this.previousTime = this.clock.getElapsedTime();
    }

    addObject(gameObject) {
        this.objects.push(gameObject);
    }

    tick() {
        const elapsedTime = this.clock.getElapsedTime();
        let frameTime = elapsedTime - this.previousTime;

        this.previousTime = elapsedTime;

        this.objects.forEach((gameObject) => {
            gameObject.tick(frameTime, elapsedTime)
        })

        this.graphics.renderer.render(this.graphics.scene, this.graphics.camera);

        requestAnimationFrame(() => this.tick());
    }
}