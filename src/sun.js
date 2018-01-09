const create_sun = (scene, me, more) => {
  const sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-1, -2, -1), scene)

  sun.position  = new BABYLON.Vector3(20, 40, 20)
  sun.intensity = 0.5

  sun.autoUpdateExtends = false
  
  const shadow_generator = new BABYLON.ShadowGenerator(4092, sun)

  shadow_generator.getShadowMap().renderList.push(me)

  for (let m of more) {
    shadow_generator.addShadowCaster(m)

    m.receiveShadows = true
  }
}

export { create_sun }