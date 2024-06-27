import { Wireframe } from 'three/examples/jsm/Addons.js';
import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


// Creating scene (container), camera, and renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

function addStar() {
  //Creating a new 'star' object
  const geometry = new THREE.SphereGeometry(.125, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  //Getting random positions
  const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star)
}

//Instantiating renderer and setting camera position
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//Adding 9000 stars to the scene
Array(9000).fill().forEach(addStar);

/* --- Creating Objects --- */

//Torus Object 
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x15FF00, 
  wireframe: true
});
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);

//Moon Object
const moonTexture = new THREE.TextureLoader().load('moon-texture.jpg');
const moonTexture_normal = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonTexture_normal,
  })
);
moon.position.set(40, 15, -25);
scene.add(moon);

//Earth Object
const earthTexture = new THREE.TextureLoader().load('earth-texture.jpg');
const earthTexture_normal = new THREE.TextureLoader().load('earth-normalmap.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthTexture_normal,
  })
);
earth.position.set(45, 15, -10);
scene.add(earth);

//Jupiter Object
const jupiterTexture = new THREE.TextureLoader().load('jupiter-texture.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(20, -50, 15);
scene.add(jupiter);

//Sun Object
const sunTexture = new THREE.TextureLoader().load('sun-texture.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
sun.position.set(50, 100, -99);
scene.add(sun);

//Mars Object
const marsTexture = new THREE.TextureLoader().load('mars-texture.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
mars.position.set(-40, -30, 15);
scene.add(mars);

//Neptune Object
const neptuneTexture = new THREE.TextureLoader().load('neptune-texture.jpg');
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.position.set(-30, 45, -25);
scene.add(neptune);

//Mercury Object
const mercuryTexture = new THREE.TextureLoader().load('mercury-texture.jpg');
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
  })
);
mercury.position.set(55, -25, -25);
scene.add(mercury);

//Venus Object
const venusTexture = new THREE.TextureLoader().load('venus-texture.jpg');
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venus.position.set(75, 50, -15);
scene.add(venus);

//Uranus Object
const uranusTexture = new THREE.TextureLoader().load('uranus-texture.jpg');
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);
uranus.position.set(100, -3, 0);
scene.add(uranus);

//Uranus Ring Object
const uranusRingTexture = new THREE.TextureLoader().load('uranus-ring-texture.jpg');
const uranusRing = new THREE.Mesh(
  new THREE.RingGeometry(8, 8.5, 64, 3),
  new THREE.MeshStandardMaterial({
    map: uranusRingTexture,
    side: THREE.DoubleSide
  })
);
uranusRing.position.set(100, -3, 0);
uranusRing.rotation.x = Math.PI / 2; //To make it lie flat
scene.add(uranusRing);

//Saturn Object
const saturnTexture = new THREE.TextureLoader().load('saturn-texture.jpg');
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);
saturn.position.set(-48, -3, -15);
scene.add(saturn);

//Saturn Ring Object
const saturnRingTexture = new THREE.TextureLoader().load('saturn-ring-texture.jpg');
const saturnRing = new THREE.Mesh(
  new THREE.RingGeometry(11, 13, 64, 3),
  new THREE.MeshStandardMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
    //transparent: true,
  })
);
saturnRing.position.set(-48, -3, -15);
saturnRing.rotation.x = Math.PI / 2; //To make it lie flat
scene.add(saturnRing);

//---------------------------------------------------------------------


//Creating an ambient and point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-15, 15, 15);
const ambientLight = new THREE.AmbientLight(0xffffff);  //White light
scene.add( pointLight, ambientLight);

// //DEV - adding helpers for testing purposes
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

//Allowing for users to move around the scene by dragging
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; //minimize conflictions with scrolling the text

//Loading in the background (It almost looks better without, will re-evaluate later)
//const spaceTexture = new THREE.TextureLoader().load('outer-space-background.jpg');
//scene.background = spaceTexture;

//Ensuring that the renderer properly resizes the window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

//Radiuses for moon rotations
const radius = 15.81; //The approximate radius
let angle = 0;

//Recursively loops through all objects, animating each one. Will be called at the end
function animate() {
  requestAnimationFrame(animate);
  //Rotate the objects
  //torus.rotation.y += .01;

  earth.rotation.x += .01;
  earth.rotation.y += -.005;
  earth.rotation.z += .005;
  jupiter.rotation.x += .005;
  jupiter.rotation.y += .01;
  jupiter.rotation.z += .005;
  sun.rotation.x += .002;
  sun.rotation.y += .001;
  sun.rotation.z += .001;
  mars.rotation.x += .005;
  mars.rotation.y += .01;
  mars.rotation.z += .005;
  neptune.rotation.x += .005;
  neptune.rotation.y += -.01;
  neptune.rotation.z += .005;
  mercury.rotation.x += .005;
  mercury.rotation.y += .01;
  mercury.rotation.z += .005;
  venus.rotation.x += -.01;
  venus.rotation.y += -.001;
  venus.rotation.z += .005;
  uranus.rotation.x += -.01;
  uranus.rotation.y += -.005;
  uranus.rotation.z += -.005;
  uranusRing.rotation.y += -.005;
  uranusRing.rotation.z += -.005;
  saturn.rotation.x += .01;
  saturn.rotation.y += .005;
  saturn.rotation.z += .005;
  saturnRing.rotation.y += .005;
  saturnRing.rotation.z += .005;
  //Moon's Orbit
  angle += .02; //Add the speed (.02) to the current angle
  moon.position.x = earth.position.x + radius * Math.cos(angle);
  moon.position.z = earth.position.z + radius * Math.sin(angle);
  moon.rotation.x += .01;
  moon.rotation.y += .005;
  moon.rotation.z += .005;
  //Update controls and re-render
  controls.update();
  renderer.render(scene, camera);
}

animate();

