export function createChair() {
  const chair = new THREE.Group();
  
  // Materials (we'll clone these for each part)
  const seatMat = new THREE.MeshStandardMaterial({ 
    color: 0xC19A6B,
    // Makes the material shinier to make highlights pop
    roughness: 0.2, 
    metalness: 0.1 
  });
  const legMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Darker wood

  // --- Seat (square top) ---
  const seatGeo = new THREE.BoxGeometry(1.5, 0.1, 1.5);
  const seat = new THREE.Mesh(seatGeo, seatMat); // The seat can use the original material
  seat.name = 'Seat'; // <-- Give it a name
  seat.position.y = 0.5;
  seat.castShadow = true;
  seat.receiveShadow = true;
  chair.add(seat);

  // --- Legs (4 cylinders) ---
  const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 16);
  
  // Give each leg position and a corresponding name
  const legData = [
    { pos: { x: 0.6, z: 0.6 },  name: 'Front-Right Leg' },
    { pos: { x: -0.6, z: 0.6 }, name: 'Front-Left Leg' },
    { pos: { x: 0.6, z: -0.6 }, name: 'Back-Right Leg' },
    { pos: { x: -0.6, z: -0.6 },name: 'Back-Left Leg' }
  ];

  legData.forEach(data => {
    // Use .clone() to create a unique material for each leg
    const leg = new THREE.Mesh(legGeo, legMat.clone()); 
    leg.name = data.name; // <-- Assign the unique name
    leg.position.set(data.pos.x, 0.25, data.pos.z);
    leg.castShadow = true;
    leg.receiveShadow = true;
    chair.add(leg);
  });

  // --- Backrest (taller rectangle) ---
  const backGeo = new THREE.BoxGeometry(1.5, 1, 0.1);
  // Use .clone() here too so it highlights independently from the seat
  const back = new THREE.Mesh(backGeo, seatMat.clone()); 
  back.name = 'Backrest'; // <-- Give it a name
  back.position.set(0, 1.1, -0.7);
  back.castShadow = true;
  back.receiveShadow = true;
  chair.add(back);

  return chair;
}