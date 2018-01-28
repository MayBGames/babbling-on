const create_point_lights = (scene, me, room) => {
  let rows = 2
  let cols = 2

  let i = -1

  while (i < rows) {
    let j = -1
    
    while (j < cols) {
      place_light(i * 50, j * 50, me, room, scene)
      
      j += 2
    }

    i += 2
  }
}

const place_light = (x, z, me, room, scene) => {
  const point_light = new BABYLON.PointLight(`point_light_one`, new BABYLON.Vector3(x, 45, z), scene)

  point_light.intensity = 1.5
  point_light.range     = 75

  point_light.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random())

  const shadow_generator = new BABYLON.ShadowGenerator(1024, point_light)

  shadow_generator.useBlurCloseExponentialShadowMap = true

  shadow_generator.addShadowCaster(me)
  
  for (let r of Object.keys(room))
    shadow_generator.addShadowCaster(room[r])
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
  create_ambient_light
}