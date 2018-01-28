import { init_controls } from '/src/movement.js'
import { create_camera } from '/src/camera.js'
import { create_scene  } from '/src/scene.js'
import { create_player } from '/src/player.js'
import { create_room   } from '/src/room.js'
import { create_word_cube } from '/src/word_cube.js'

import {
  create_point_lights,
  create_ambient_light
} from '/src/lights.js'

import { generate_reference_blocks } from '/src/reference_blocks.js'

import { letters } from '/src/letters.js'

const canvas = document.getElementsByTagName('canvas')[0]

window.addEventListener('DOMContentLoaded', () => {
  const engine = new BABYLON.Engine(canvas, true, null, false)
  const scene  = create_scene(engine)
  const me     = create_player(scene)
  
  const room = create_room(scene)

  const blocks = generate_reference_blocks(scene)

  create_word_cube(new BABYLON.Color3(80, 1.5, 80), scene)

  for (let b in blocks)
    room[b] = blocks[b]

  scene.ambientColor = new BABYLON.Color3(0.5, 0.5, 0.5)
  
  init_controls(engine, scene, me)

  scene.activeCamera = create_camera(canvas, scene, me)

  canvas.focus()

  create_point_lights(scene, me, room)

  // me.onCollide = (mesh) => box.visibility = 0

  engine.runRenderLoop(() => scene.render())
})
