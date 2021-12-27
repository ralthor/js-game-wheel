import * as dat from 'dat.gui';
import * as THREE from 'three';

const gui = new dat.GUI()

class Speed {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = new Speed(0.001, 0.0014)

function keyIsDown() {
    speed.x += 0.01;
}

function mouseIsDown() {
    speed.x -= 0.01;
}


var scene = new THREE.Scene();

var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
cube.position.set(0.3, 1, 0);
scene.add(cube);

var cube2 = new THREE.Mesh(geometry, material);
cube2.position.set(-0.3, 1, 0);
scene.add(cube2);

const cube2Rotation = {
    x: 0
}
const guiCube2 = gui.addFolder('Cube 2')
guiCube2.add(cube2Rotation, 'x').min(0).max(360).step(1).onChange(() => {
    cube2.rotation.x = cube2Rotation.x * 3.14159 / 180;
    cube2.rotation.z = cube2Rotation.x * 3.14159 / 180;
})

var geometry = new THREE.BoxGeometry(100, 100, 1);
var material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
var earth = new THREE.Mesh(geometry, material);
earth.position.set(0, -2, 0);
earth.rotation.set(-1, 0, 0)
scene.add(earth);


const light1 = new THREE.DirectionalLight(0xffffff, 1)
light1.position.set(-4, 1.9, 16)
scene.add(light1)

const guiLight1 = gui.addFolder('Light1')
guiLight1.add(light1.position, 'x');
guiLight1.add(light1.position, 'y');
guiLight1.add(light1.position, 'z');
guiLight1.add(light1, 'intensity');
const light1Color = {
    color: 0xffffff
}
guiLight1.addColor(light1Color, 'color').onChange(() => {
    light1.color.set(light1Color.color)
})

gui.add(speed, 'x');
gui.add(speed, 'y');


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(105, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);


const clock = new THREE.Clock();

let previousTime = clock.getElapsedTime();

let stop = false;
window.addEventListener('click', (ev) => {
    stop = !stop;
    console.log(ev)
})

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    frameTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if (stop)
        frameTime = 0;

    cube.rotation.x += speed.x * 1000 * frameTime;
    cube.rotation.y += speed.y * 1000 * frameTime;

    renderer.render(scene, camera);

    requestAnimationFrame(tick);
}

tick();