export function setupCameraAnimation(camera, controls) {
  const rotationCenter = new THREE.Vector3(0, 1, 0);
  const rotationSpeed = 0.005;

  let isUserInteracting = false;
  let isZooming = false;
  let zoomTimeout;

  controls.addEventListener('start', () => {
    isUserInteracting = true;
  });

  controls.addEventListener('end', () => {
    isUserInteracting = false;
    // After a user pans the camera, we reset the target back to the chair.
    // This is necessary for after a real drag, and the interaction script
    // prevents this from running on a simple click.
    controls.target.copy(rotationCenter);
  });

  const onWheel = () => {
    isZooming = true;
    clearTimeout(zoomTimeout);
    zoomTimeout = setTimeout(() => {
      isZooming = false;
    }, 300);
  };
  controls.domElement.addEventListener('wheel', onWheel);

  function updateCamera() {
    // Only apply our custom rotation if the user isn't actively interacting.
    if (!isUserInteracting && !isZooming) {
      // This logic will smoothly rotate around the target set by the controls.
      const horizontalPosition = camera.position.x - controls.target.x;
      const verticalPosition = camera.position.z - controls.target.z;
      const currentDistance = Math.sqrt(horizontalPosition * horizontalPosition + verticalPosition * verticalPosition);
      let currentAngle = Math.atan2(verticalPosition, horizontalPosition);
      currentAngle += rotationSpeed;
      camera.position.x = controls.target.x + currentDistance * Math.cos(currentAngle);
      camera.position.z = controls.target.z + currentDistance * Math.sin(currentAngle);
    }
    
    // Always call controls.update() at the end of the camera logic.
    controls.update();
  }

  return { updateCamera };
}