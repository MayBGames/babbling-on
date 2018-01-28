const scale_factor = 15.0

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
    
    panels[panel].material = new BABYLON.StandardMaterial(`${panel}_material`, scene)

    const material = panels[panel].material
    
    material.diffuseTexture  = new BABYLON.Texture('/assets/concrete.png', scene)
    material.bumpTexture     = new BABYLON.Texture('/assets/concrete bump.png', scene)
    material.specularTexture = new BABYLON.Texture('/assets/concrete bump.png', scene)

    material.useParallax = true
    material.useParallaxOcclusion = true
    material.parallaxScaleBias = 0.1
    material.specularPower = 1000.0
    material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5)

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

  panels.floor.material.diffuseTexture.uScale = scale_factor
  panels.floor.material.diffuseTexture.vScale = scale_factor
  panels.floor.material.bumpTexture.uScale = scale_factor
  panels.floor.material.bumpTexture.vScale = scale_factor
  panels.floor.material.specularTexture.uScale = scale_factor
  panels.floor.material.specularTexture.vScale = scale_factor

  return panels
}

export { create_room }