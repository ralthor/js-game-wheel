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
export class Earth extends GameObject {
    constructor(name) {
        super(name);

        this.geometry = new THREE.BoxGeometry(100, 100, 1);
        this.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.set(0, -2, 0);
        this.cube.rotation.set(-1, 0, 0)
    }

    object() {
        return this.cube;
    }
}