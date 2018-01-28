const create_point_lights = (scene, me, room) => {
  let rows = 2
  let cols = 2

  let i = -1

  while (i < rows) {
    let j = -1
    
    while (j < cols) {
      place_light(i * 50, 45, j * 50, 1, 80, me, room, scene)
      
      j += 2
    }

    i += 2
  }

  place_light(1, 20, 1, 0.8, 80, me, room, scene)
}

const place_light = (x, y, z, intensity, range, me, room, scene) => {
  const point_light = new BABYLON.PointLight(`point_light`, new BABYLON.Vector3(x, y, z), scene)

  point_light.intensity = intensity
  point_light.range     = range

  point_light.diffuse  = new BABYLON.Color3(0.9, 0.8, 0.9)
  point_light.specular = new BABYLON.Color3(1, 0.8, 1)

  const shadow_generator = new BABYLON.ShadowGenerator(1024, point_light)

  shadow_generator.useBlurCloseExponentialShadowMap = true

  shadow_generator.addShadowCaster(me)
  
  for (let r of Object.keys(room)) {
    if (Math.abs(room[r].position.x - point_light.position.x) < 50 || Math.abs(room[r].position.z - point_light.position.z) < 50)
      shadow_generator.addShadowCaster(room[r])
  }
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