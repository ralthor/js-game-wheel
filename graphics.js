import * as THREE from 'three';

export class Graphics {
    constructor() {
        this.scene = new THREE.Scene();
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.createCamera();
        this.createLight();
        this.createRenderer();
        this.addResizeHandler();
    }

    createLight() {
        this.light1 = new THREE.DirectionalLight(0xffffff, 1);
        this.light1.position.set(-4, 1.9, 16);
        this.scene.add(this.light1);

        this.ambientLight = new THREE.AmbientLight(0x909090);
        this.scene.add(this.ambientLight);

    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(105, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 2;
        this.scene.add(this.camera);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);
    }

    addResizeHandler() {
        window.addEventListener('resize', () => {
            // Update sizes
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })
    }
}