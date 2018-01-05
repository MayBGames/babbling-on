const create_sun = (scene, casters) => {
  const dir_light = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-1, -2, -1), scene)
  const shadow    = new BABYLON.ShadowGenerator(1024, dir_light)

  dir_light.position  = new BABYLON.Vector3(20, 40, 20)
  dir_light.intensity = 0.5

  for (let caster of casters)
    shadow.addShadowCaster(caster)
  
  shadow.useExponentialShadowMap = true

  return {
    light:  dir_light,
    shadow: shadow
  }
}

export { create_sun }