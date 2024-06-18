import { Wireframe } from 'three/examples/jsm/Addons.js';
import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


// Creating scene (container), camera, and renderer
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//Recursively loops through all objects, animating each one. Will be called at the end
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += .01;
  torus.rotation.y += .01;
  torus.rotation.z += .01;
  controls.update();
  renderer.render(scene, camera);
}

function addStar() {
  //Creating a new 'star' object
  const geometry = new THREE.SphereGeometry(.125, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  //Getting random positions
  const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star)
}

//Instantiating renderer and setting camera position
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//Creating torus object & adding it to the scene
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

//Creating an ambient and point light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-15, 15, 15);
const ambientLight = new THREE.AmbientLight(0xffffff);  //White light
scene.add( pointLight, ambientLight);

//DEV - adding helpers for testing purposes
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

//Allowing for users to move around the scene by dragging
const controls = new OrbitControls(camera, renderer.domElement);

//Adding stars to the scene
Array(200).fill().forEach(addStar);

//Loading in the background
const spaceTexture = new THREE.TextureLoader().load('black_and_white_space_background.jpg');
scene.background = spaceTexture;

animate();

