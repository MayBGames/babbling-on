import { letters } from '/src/letters.js'

const placement_offset = 0.7

const setup_mesh = (letter, option, rotation, scene) => {
  const mesh = BABYLON.MeshBuilder.CreateBox(letter, option, scene)
  
  mesh.checkCollisions = true

  mesh.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(rotation), BABYLON.Space.WORLD)

  const mesh_material = new BABYLON.StandardMaterial(`${letter} material`, scene)

  mesh_material.ambientColor = new BABYLON.Color3(0.25, 0.25, 0.25)
  mesh_material.diffuseTexture = new BABYLON.Texture(`${letter} diffuse.png`, scene)
  mesh_material.bumpTexture = new BABYLON.Texture(`${letter} bump.png`, scene)
  mesh_material.emissiveTexture = new BABYLON.Texture(`${letter} emissive.png`, scene)

  mesh.material = mesh_material

  return mesh
}

const create_word_cube = (letter, origin, scene) => {

  const return_me = [ ]

/* === FRONT === */
  const front = setup_mesh(letter, { depth: 0.25 }, 0, scene)

  front.position = new BABYLON.Vector3(
    origin.x,
    origin.y,
    origin.z + placement_offset
  )

  return_me.push(front)

/* === RIGHT === */
  const right = setup_mesh(letter, { depth: 0.25 }, 90, scene)

  right.position = new BABYLON.Vector3(
    origin.x - placement_offset,
    origin.y,
    origin.z
  )

  return_me.push(right)

/* === BACK === */
  const back = setup_mesh(letter, { depth: 0.25 }, 0, scene)

  back.position = new BABYLON.Vector3(
    origin.x,
    origin.y,
    origin.z - placement_offset
  )

  return_me.push(back)

/* === LEFT === */
  const left = setup_mesh(letter, { depth: 0.25 }, 270, scene)

  left.position = new BABYLON.Vector3(
    origin.x + placement_offset,
    origin.y,
    origin.z
  )

  return_me.push(left)

/* === TOP === */
  const top = setup_mesh(letter, { height: 0.25 }, 0, scene)

  top.position = new BABYLON.Vector3(
    origin.x,
    origin.y + placement_offset,
    origin.z
  )

  return_me.push(top)

/* === CORE === */
  const core = BABYLON.MeshBuilder.CreateSphere('box_core', { diameter: 0.75 } , scene)

  core.position = origin

  core.checkCollisions = false

  const core_material = new BABYLON.StandardMaterial('material_core', scene)

  core_material.diffuseColor  = new BABYLON.Color3(1, 0.9, 0.8)
  core_material.emissiveColor = core_material.diffuseColor

  core.material = core_material

  const hl1 = new BABYLON.HighlightLayer("hl1", scene);
  hl1.addMesh(core, new BABYLON.Color3(1, 0.9, 0.8));
  hl1.outerGlow = false;

  const hl2 = new BABYLON.HighlightLayer("hl2", scene);
  hl2.addMesh(core, new BABYLON.Color3(1, 0.9, 0.8));
  hl2.innerGlow = false

  const point_light = new BABYLON.PointLight(`point_light`, origin, scene)

  point_light.diffuse  = new BABYLON.Color3(1, 0.9, 0.8)
  point_light.specular = new BABYLON.Color3(0.9, 0.6, 0.9)

  point_light.intensity = 0.5
  point_light.range     = 5

  point_light.diffuseColor = BABYLON.Color3.Red()

  return return_me
}

export {
  create_word_cube
}