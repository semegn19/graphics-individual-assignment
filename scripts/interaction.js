export function initInteractions(scene, camera, renderer, product) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const domElement = renderer.domElement;
  const infoPanel = document.getElementById('info-panel');
  const infoText = document.getElementById('part-name');
  
  let infoPanelTimeout;
  let highlightTimeout;
  let highlightedObject = null;
  let originalEmissiveColor = 0x000000;

  // We will now listen for 'mousedown' instead of 'click' to intercept the event earlier.
  domElement.addEventListener('mousedown', onMouseDown);

  function onMouseDown(event) {
    // Check if the click hit the chair
    mouse.x = (event.clientX / domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(product, true);

    if (intersects.length > 0) {
      // If we clicked on the product, we stop the event from bubbling up
      // to OrbitControls. This prevents the click from starting a pan.
      event.stopPropagation();
    }
  }

  // The original click handler for feedback remains the same.
  domElement.addEventListener('click', onClick);

  function onClick(event) {
    // This logic is only for visual feedback
    clearTimeout(infoPanelTimeout);
    if (highlightedObject) {
      clearTimeout(highlightTimeout);
      highlightedObject.material.emissive.setHex(originalEmissiveColor);
      highlightedObject = null;
    }

    mouse.x = (event.clientX / domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(product, true);
    
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      highlightedObject = obj;
      originalEmissiveColor = obj.material.emissive.getHex();
      obj.material.emissive.setHex(0x333333);
      
      highlightTimeout = setTimeout(() => {
        obj.material.emissive.setHex(originalEmissiveColor);
        highlightedObject = null;
      }, 300);
      
      infoText.textContent = obj.name;
      infoPanel.classList.remove('hidden');
      infoPanelTimeout = setTimeout(() => {
        infoPanel.classList.add('hidden');
      }, 2000);
    }
  }
}