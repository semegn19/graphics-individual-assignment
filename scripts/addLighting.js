export function setupLights(scene) {
  // --- Light 1: Key Light (Main light source) ---
  // This is the brightest light, creates the main highlights and shadows.
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.position.set(-5, 5, 5); // From the top-left
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  scene.add(keyLight);

  // --- Light 2: Fill Light ---
  // A softer light from the opposite side to "fill in" shadows
  // and ensure the object doesn't look flat. Creates secondary highlights.
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
  fillLight.position.set(5, 2, 5); // From the front-right
  scene.add(fillLight);

  // --- Light 3: Rim Light (or Back Light) ---
  // This light comes from behind the object. It creates a bright outline
  // on the edges, separating it from the background and adding a lot of pop.
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
  rimLight.position.set(0, 3, -5); // From the back
  scene.add(rimLight);
  
  // A little bit of ambient light to lift the darkest shadows
  const ambient = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambient);
}