const create_player = (scene) => {
  const player = BABYLON.MeshBuilder.CreateCylinder('player', { }, scene)

  player.ellipsoid             = new BABYLON.Vector3(1.3, 2, 1.3)
  player.material              = new BABYLON.StandardMaterial('player_mat', scene)
  player.material.diffuseColor = new BABYLON.Color3(1, 0.75, 1)

  player.position        = new BABYLON.Vector3(0, -6, 20)
  player.checkCollisions = true

  player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0 }, scene)

  return player
}

export { create_player }