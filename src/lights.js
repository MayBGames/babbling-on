const create_point_lights = (scene, me, room) => {
  const point_light_one = new BABYLON.PointLight('point_light_one', new BABYLON.Vector3(20, 19, 20), scene)
  const point_light_two = new BABYLON.PointLight('point_light_two', new BABYLON.Vector3(-20, 19, -20), scene)

  point_light_one.intensity = 1.5
  point_light_one.range = 100

  point_light_two.intensity = 3
  point_light_two.range = 100

  point_light_one.diffuse = new BABYLON.Color3(0.5,    0, 1)
  point_light_two.diffuse = new BABYLON.Color3(0.5, 0.75, 1)
  
  const shadow_generator_one = new BABYLON.ShadowGenerator(512, point_light_one)
  const shadow_generator_two = new BABYLON.ShadowGenerator(512, point_light_two)

  // shadow_generator_one.addShadowCaster(me)
  shadow_generator_two.addShadowCaster(me)

  // for (let r of Object.keys(room)) {
  //   shadow_generator_one.addShadowCaster(room[r])
  //   shadow_generator_two.addShadowCaster(room[r])
  // }
}

const create_four_lights = (scene, me, room) => {
  const light_one = new BABYLON.SpotLight(
    'spot_light_one',
    new BABYLON.Vector3(-99,  49, -99),
    new BABYLON.Vector3( 45, -45,  45),
    BABYLON.Tools.ToRadians(30),
    0.1,
    scene
  )
  const point_light_one = new BABYLON.PointLight('point_light_one', new BABYLON.Vector3(-99,  49, -99), scene)

  const light_plane = BABYLON.MeshBuilder.CreatePlane('vls_plane', { width: 1.0, height:  1.0 }, scene)
  
  light_plane.material              = new BABYLON.StandardMaterial('vlr_material', scene)
  light_plane.material.diffuseColor = new BABYLON.Color3(1, 1, 1)

  point_light_one.intensity = 0.5
  point_light_one.range = 10

  light_one.intensity = 1.5

  const shadow_generator_one = new BABYLON.ShadowGenerator(2048, light_one)

  shadow_generator_one.addShadowCaster(me)

  for (let r of Object.keys(room))
    shadow_generator_one.addShadowCaster(room[r])
}

const create_ambient_light = (scene, me, room) => {
  const light = new BABYLON.HemisphericLight('test_hemisphere_light', new BABYLON.Vector3(0, 25, 0), scene)
  
  light.diffuse = new BABYLON.Color3(1, 0, 0)
	light.specular = new BABYLON.Color3(0, 1, 0)
  light.groundColor = new BABYLON.Color3(0, 1, 0)
  
  light.intensity = 5
}

export {
  create_point_lights,
  create_four_lights,
  create_ambient_light
}