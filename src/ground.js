const create_ground = (scene) => {
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 200.0 , height: 200.0 }, scene)

  ground.receiveShadows        = true
  ground.material              = new BABYLON.StandardMaterial('ground_mat', scene)
  ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.75, 1)

  ground.checkCollisions = true
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene)

  ground.position = new BABYLON.Vector3(5, -10, -15)

  return ground
}

export { create_ground }