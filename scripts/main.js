import { initScene } from './initScene.js';
import { createChair } from './createProduct.js';
import { setupLights } from './addLighting.js';
import { initInteractions } from './interaction.js';
import { setupCameraAnimation } from './cameraAnimation.js';

const clock = new THREE.Clock();
const { scene, camera, renderer, controls } = initScene();
const product = createChair();
scene.add(product);

const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.8
});
const groundPlane = new THREE.Mesh(groundGeometry, groundMaterial);
groundPlane.rotation.x = -Math.PI / 2; 
groundPlane.receiveShadow = true; 
scene.add(groundPlane);

// Set the initial camera position
camera.position.set(0, 1.5, 3);
// Explicitly set the point for OrbitControls to look at.
// The chair's center is around y=1.
controls.target.set(0, 1, 0);
// Call controls.update() ONCE. This synchronizes the controls'
// internal state with the camera's new position and target.
// This resolves the conflict before the animation starts.
controls.update();


setupLights(scene);
initInteractions(scene, camera, renderer, product);
const { updateCamera } = setupCameraAnimation(camera, controls);

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // The floating animation
  product.position.y = Math.sin(elapsedTime * 1.5) * 0.05;

  updateCamera();
  renderer.render(scene, camera);
}
animate();