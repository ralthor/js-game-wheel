import * as THREE from 'three'

export class GameObject {
    constructor(name) {
        this.name = name;
        console.log("Creating game object " + name)
    }

    tick(frameTime, elapsedTime) {
        console.log("this method should be overriden for game object " + this.name)
    }
}

class FrameRateReporter extends GameObject {
    tick(frameTime, elapsedTime) {
        const previousTime = elapsedTime - frameTime;
        if (Math.floor(elapsedTime) != Math.floor(previousTime))
            console.log(1.0 / frameTime);
    }
}

export class Cube extends GameObject {
    constructor(name) {
        super(name);

        this.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.set(0.3, 1, 0);

        this.speed = {
            x: 0.001,
            y: 0.0014
        };
    }

    object() {
        return this.cube;
    }

    tick(frameTime) {
        this.cube.rotation.x += this.speed.x * 1000 * frameTime;
        this.cube.rotation.y += this.speed.y * 1000 * frameTime;
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