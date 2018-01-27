const create_player = (scene) => {
  const player = BABYLON.MeshBuilder.CreateBox('player', { height: 2, width: 1, depth: 1 }, scene)

  player.material              = new BABYLON.StandardMaterial('player_mat', scene)
  player.material.diffuseColor = new BABYLON.Color3(1, 0.75, 1)

  player.position        = new BABYLON.Vector3(0, 1.5, 0)
  player.checkCollisions = true
  // player.receiveShadows = true

  player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene)

  return player
}

export { create_player }