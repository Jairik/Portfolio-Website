/* --- Dev Note For Myself --- 
Make sure you correct the directory once you build and before you push 
to the github-pages branch. It will save you 4 hours of debugging 😭*/

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialize all the variables
let scene, camera, renderer, earth, moon, jupiter, sun, mars, neptune, mercury, venus, uranus, 
uranusRing, saturn, saturnRing, controls, stars = [];
const AU = 10.0; // Astronomical Unit, used for scaling the solar system
const scaledRadius = 1; // Scaling factor for the radius of the planets (earth as base unit)
const distanceScale = 50; // Scale factor for the distances between planets
const sunScale = 0.25; // Scale down the sun for better visibility

// Dynamically change FOV for smaller screens
const isMobile = window.innerWidth < 768;
const fov = isMobile ? 75 : 100;

// Helper function to logarithmically compress AU distances into screen space
function compressAU(au) {
  return Math.log10(au + 1) * distanceScale;
}

function init() {
  // Creating scene (container), camera, and renderer
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 2000);
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true
  });

  function addStar() {
    //Creating a new 'star' object
    const geometry = new THREE.SphereGeometry(.125, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    //Getting random positions
    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(AU * distanceScale * 6900));
    star.position.set(x, y, z);
    scene.add(star);
    stars.push(star);
    if(stars == null){console.log("Star Error")}
  }

  //Adding 6900 stars to the scene
  //Note: May not be quite as filled, but will help with rendering speed and is still alot of stars
  Array(6900).fill().forEach(addStar);

  /* --- Creating Objects --- */

  //Moon Object
  const moonTexture = new THREE.TextureLoader().load('moon-texture.jpg');
  const moonTexture_normal = new THREE.TextureLoader().load('normal.jpg');
  moon = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * .1, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: moonTexture_normal,
    })
  );
  moon.position.set(AU * distanceScale * 40, 15, -25);
  scene.add(moon);

  //Earth Object
  const earthTexture = new THREE.TextureLoader().load('earth-texture.jpg');
  const earthTexture_normal = new THREE.TextureLoader().load('earth-normalmap.jpg');
  earth = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * 1, 32, 32),
    new THREE.MeshStandardMaterial({
      map: earthTexture,
      normalMap: earthTexture_normal,
    })
  );
  earth.position.set(AU * distanceScale * 10, 0, 0);
  scene.add(earth);

  //Jupiter Object
  const jupiterTexture = new THREE.TextureLoader().load('jupiter-texture.jpg');
  jupiter = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * 10.967, 32, 32),
    new THREE.MeshStandardMaterial({
      map: jupiterTexture,
    })
  );
  jupiter.position.set(AU * distanceScale * 52, 0, 0);
  scene.add(jupiter);

  //Sun Object
  const sunTexture = new THREE.TextureLoader().load('sun-texture.jpg');
  sun = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * 109.3 * sunScale, 32, 32),
    new THREE.MeshStandardMaterial({
      map: sunTexture,
    })
  );
  sun.position.set(AU * distanceScale * 0, 0, 0);
  scene.add(sun);

  //Mars Object
  const marsTexture = new THREE.TextureLoader().load('mars-texture.jpg');
  mars = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * .532, 32, 32),
    new THREE.MeshStandardMaterial({
      map: marsTexture,
    })
  );
  mars.position.set(AU * distanceScale * 15.2, 0, 0);
  scene.add(mars);

  //Neptune Object
  const neptuneTexture = new THREE.TextureLoader().load('neptune-texture.jpg');
  neptune = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * 3.866, 32, 32),
    new THREE.MeshStandardMaterial({
      map: neptuneTexture,
    })
  );
  neptune.position.set(AU * distanceScale * 300.5, 0, 0);
  scene.add(neptune);

  //Mercury Object
  const mercuryTexture = new THREE.TextureLoader().load('mercury-texture.jpg');
  mercury = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * .383, 32, 32),
    new THREE.MeshStandardMaterial({
      map: mercuryTexture,
    })
  );
  mercury.position.set(AU * distanceScale * 3.9, 0, 0);
  scene.add(mercury);

  //Venus Object
  const venusTexture = new THREE.TextureLoader().load('venus-texture.jpg');
  venus = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * .950, 32, 32),
    new THREE.MeshStandardMaterial({
      map: venusTexture,
    })
  );
  venus.position.set(AU * distanceScale * 7.2, 0, 0);
  scene.add(venus);

  //Uranus Object
  const uranusTexture = new THREE.TextureLoader().load('uranus-texture.jpg');
  uranus = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * 3.979, 32, 32),
    new THREE.MeshStandardMaterial({
      map: uranusTexture,
    })
  );
  uranus.position.set(AU * distanceScale * 192.2);
  scene.add(uranus);

  //Uranus Ring Object
  const uranusRingTexture = new THREE.TextureLoader().load('uranus-ring-texture.jpg');
  uranusRing = new THREE.Mesh(
    new THREE.RingGeometry(scaledRadius * 4, 8.5, 64, 3),
    new THREE.MeshStandardMaterial({
      map: uranusRingTexture,
      side: THREE.DoubleSide
    })
  );
  uranusRing.position.set(AU * distanceScale * 193, -3, 0);
  uranusRing.rotation.x = Math.PI / 2; //To make it lie flat
  scene.add(uranusRing);

  //Saturn Object
  const saturnTexture = new THREE.TextureLoader().load('saturn-texture.jpg');
  saturn = new THREE.Mesh(
    new THREE.SphereGeometry(scaledRadius * 9.139, 32, 32),
    new THREE.MeshStandardMaterial({
      map: saturnTexture,
    })
  );
  saturn.position.set(AU * distanceScale * 95.8, 0, 0);
  scene.add(saturn);

  //Saturn Ring Object
  const saturnRingTexture = new THREE.TextureLoader().load('saturn-ring-texture.jpg');
  saturnRing = new THREE.Mesh(
    new THREE.RingGeometry(scaledRadius * 9.2, 13, 64, 3),
    new THREE.MeshStandardMaterial({
      map: saturnRingTexture,
      side: THREE.DoubleSide,
      //transparent: true,
    })
  );
  saturnRing.position.set(AU * distanceScale * 96, 0, 0);
  saturnRing.rotation.x = Math.PI / 2; //To make it lie flat
  scene.add(saturnRing);

  //---------------------------------------------------------------------


  //Creating an ambient and point light
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(-15, 15, 15);
  const ambientLight = new THREE.AmbientLight(0xffffff);  //White light
  scene.add( pointLight, ambientLight);

  //Allowing for users to move around the scene by dragging
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false; //minimize conflictions with scrolling the text

  //Ensuring that the renderer properly resizes the window
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  //Instantiating renderer and setting camera position
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(AU * distanceScale * 50, AU * distanceScale * 10, AU * distanceScale * 150);  // x, y, z
  camera.lookAt(sun.position); // Aim the camera torwards the sun

  //Start the animation loop
  animate();

  //Add a scroll listener
  window.addEventListener('scroll', onScroll)
}

//Radiuses for moon rotations
const radius = 15.81;
let angle = 0;

//Recursively loops through all objects, animating each one. Will be called at the end
function animate() {
  //Rotate the planet objects
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
  // Rotate all of the stars
  // Add slight movement to each star
  stars.forEach(star => {
    star.position.x += Math.sin(star.position.x * 0.001) * 0.001;
    star.position.y += Math.cos(star.position.y * 0.001) * 0.001; 
    star.position.z += Math.sin(star.position.z * 0.001) * 0.001; 
  });
  //Update controls and re-render
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

console.log("Planets initiated and rotating");

function onScroll() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  //Map scroll position to camera and zoom
  const progress = scrollY / maxScroll;
  camera.position.y = -progress * 10; //Move the camera down
  camera.zoom = 1 + progress * 2; //Zoom out
  camera.updateProjectionMatrix();
}

//Initial log because im a cool guy
console.log("Website created using Vite framework and three.js package. All code can be found on my github.");

//Run init() when the window loads
window.onload = init;
