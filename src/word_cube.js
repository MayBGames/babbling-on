import { letters } from '/src/letters.js'

const placement_offset = 0.7

const create_word_cube = (origin, scene) => {

/* === FRONT === */
  const front = BABYLON.MeshBuilder.CreateBox('box_front', { height: 1, width: 1, depth: 0.25 }, scene)

  front.position = new BABYLON.Vector3(
    origin.x,
    origin.y,
    origin.z + placement_offset
  )
  
  front.checkCollisions = true

  const front_material = new BABYLON.StandardMaterial('material_front',scene)
  front_material.diffuseTexture = new BABYLON.Texture(letters.H, scene)

  front.material = front_material

/* === BACK === */
  const back = BABYLON.MeshBuilder.CreateBox('box_front', { height: 1, width: 1, depth: 0.25 }, scene)

  back.position = new BABYLON.Vector3(
    origin.x,
    origin.y,
    origin.z - placement_offset
  )
  
  back.checkCollisions = true

  const back_material = new BABYLON.StandardMaterial('material_back',scene)
  back_material.diffuseTexture = new BABYLON.Texture(letters.L, scene)

  back.material = back_material

/* === RIGHT === */
  const right = BABYLON.MeshBuilder.CreateBox('box_front', { height: 1, width: 0.25, depth: 1 }, scene)

  right.position = new BABYLON.Vector3(
    origin.x + placement_offset,
    origin.y,
    origin.z
  )
  
  right.checkCollisions = true

  const right_material = new BABYLON.StandardMaterial('material_right',scene)
  right_material.diffuseTexture = new BABYLON.Texture(letters.E, scene)

  right.material = right_material

}

export {
  create_word_cube
}