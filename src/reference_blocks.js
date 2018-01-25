const generate_reference_blocks = (scene) => {
  const boxes = [ ]
  
  let i = 0
  
  while (i++ < 50) {
    const dimensions = {
      width: Math.random() * 20,
      height: Math.random() * 100,
      depth: Math.random() * 20
    }
    
    const box = BABYLON.MeshBuilder.CreateBox(`box_${i}`, dimensions, scene)

    box.material              = new BABYLON.StandardMaterial(`box_mat_${i}`, scene)
    box.material.diffuseColor = new BABYLON.Color3(1, 1, 0)

    // This is kind of crap.
    // It really shouldn't be hardcoded.
    // I just happen to know that the size of the plane (ground) is 200 x 200
    const x   = Math.random() * 2000 - 1000
    const z   = Math.random() * 2000 - 1000

    box.position = new BABYLON.Vector3(x, 50, z)

    box.checkCollisions = true

    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, scene)

    boxes.push(box)
  }

  return boxes
}

export { generate_reference_blocks }