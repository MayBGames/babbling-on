import { create_camera } from '/src/camera.js'
import { create_scene  } from '/src/scene.js'
import { create_player } from '/src/player.js'
import { create_ground } from '/src/ground.js'
import { create_sun    } from '/src/sun.js'

import { generate_reference_blocks } from '/src/reference_blocks.js'

const canvas = document.getElementsByTagName('canvas')[0]

window.addEventListener('DOMContentLoaded', () => {
  const engine = new BABYLON.Engine(canvas, true)
  const scene  = create_scene(engine)
  const me     = create_player(scene)
  const plane  = create_ground(scene)
  const boxes  = generate_reference_blocks(scene)
  

  scene.activeCamera = create_camera(canvas, scene, me)

  create_sun(scene, me, boxes)
  
  canvas.focus()

})
