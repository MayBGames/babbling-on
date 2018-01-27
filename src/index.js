import { init_controls } from '/src/movement.js'
import { create_camera } from '/src/camera.js'
import { create_scene  } from '/src/scene.js'
import { create_player } from '/src/player.js'
import { create_room   } from '/src/room.js'

import {
  create_point_lights,
  create_four_lights,
  create_ambient_light
} from '/src/lights.js'

import { generate_reference_blocks } from '/src/reference_blocks.js'

const canvas = document.getElementsByTagName('canvas')[0]

window.addEventListener('DOMContentLoaded', () => {
  const engine = new BABYLON.Engine(canvas, true, null, false)
  const scene  = create_scene(engine)
  const me     = create_player(scene)
  
  const room = create_room(scene)

  const blocks = generate_reference_blocks(scene)

  for (let b in blocks)
    room[b] = blocks[b]
  
  init_controls(engine, scene, me)

  scene.activeCamera = create_camera(canvas, scene, me)

  // create_ambient_light(scene)
  create_point_lights(scene, me, room)
  create_four_lights(scene, me, room)
  
  canvas.focus()

  const box = BABYLON.MeshBuilder.CreateBox('box', { height: 1, width: 1, depth: 1 }, scene)

  box.position        = new BABYLON.Vector3(-5, 1.5, -5)
  box.checkCollisions = true

  box.material              = new BABYLON.StandardMaterial('box_material', scene)
  box.material.diffuseColor = new BABYLON.Color3(0.5, 0.75, 1)

  me.onCollide = (mesh) => box.dispose()

  engine.runRenderLoop(() => scene.render())
})
