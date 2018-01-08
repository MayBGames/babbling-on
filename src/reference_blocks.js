const generate_reference_blocks = (scene) => {
  const boxes = [ ]
  
  for (let i in [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]) {
    const box = BABYLON.MeshBuilder.CreateBox(`box${i}`, { }, scene)

    // This is kind of crap.
    // It really shouldn't be hardcoded.
    // I just happen to know that the size of the plane (ground) is 200 x 200
    const x   = Math.random() * 200 - 100
    const z   = Math.random() * 200 - 100

    box.position = new BABYLON.Vector3(x, 0, z)

    box.checkCollisions = true

    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0 }, scene)

    boxes.push(box)
  }

  return boxes
}

export { generate_reference_blocks }