const create_room = (scene) => {
  const panels = {
    floor:      BABYLON.MeshBuilder.CreateBox('floor',      { width: 200.0, depth:  200.0 }, scene),
    roof:       BABYLON.MeshBuilder.CreateBox('roof',       { width: 200.0, depth:  200.0 }, scene),
    left_wall:  BABYLON.MeshBuilder.CreateBox('left_wall',  { depth: 200.0, height: 50.0  }, scene),
    right_wall: BABYLON.MeshBuilder.CreateBox('right_wall', { depth: 200.0, height: 50.0  }, scene),
    front_wall: BABYLON.MeshBuilder.CreateBox('front_wall', { width: 200.0, height: 50.0  }, scene),
    back_wall:  BABYLON.MeshBuilder.CreateBox('back_wall',  { width: 200.0, height: 50.0  }, scene)
  }

  for (let panel of Object.keys(panels)) {
    panels[panel].receiveShadows = true
    
    panels[panel].material              = new BABYLON.StandardMaterial(`${panel}_material`, scene)
    panels[panel].material.diffuseColor = new BABYLON.Color3(0.5, 0.75, 1)

    panels[panel].checkCollisions = true
    panels[panel].physicsImpostor = new BABYLON.PhysicsImpostor(
      panels[panel], 
      BABYLON.PhysicsImpostor.BoxImpostor, 
      { mass: 0, restitution: 0 }, 
      scene
    )
  }

  panels.floor.position      = new BABYLON.Vector3(   0,  0,    0)
  panels.roof.position       = new BABYLON.Vector3(   0, 50,    0)
  panels.left_wall.position  = new BABYLON.Vector3(-100, 25,    0)
  panels.right_wall.position = new BABYLON.Vector3( 100, 25,    0)
  panels.front_wall.position = new BABYLON.Vector3(  0,  25,  100)
  panels.back_wall.position  = new BABYLON.Vector3(  0,  25, -100)

  return panels
}

export { create_room }