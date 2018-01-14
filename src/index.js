import {
  init_controls,
  process_pointer_move,
  process_player_move,
  MOVE
} from '/src/movement.js'

import {
  register_action,
  KEY_UP,
  KEY_DOWN
} from '/src/shared.js'

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
  
  init_controls(scene, me)

  scene.activeCamera = create_camera(canvas, scene, me)

  create_sun(scene, me, boxes)
  
  canvas.focus()

  engine.runRenderLoop(() => {
    process_player_move(me)
    
    scene.render()
  })

  let original_canvas_width  = canvas.width
  let original_canvas_height = canvas.height

  const pointer_move_handler = process_pointer_move(scene.activeCamera, me)

  document.onwebkitfullscreenchange = (event) => {
    if (engine.isFullscreen === false) {
      engine.setSize(original_canvas_width, original_canvas_height)

      document.removeEventListener('mousemove', pointer_move_handler, false)
    } else if (engine.isFullscreen === true) {
      document.addEventListener('mousemove', pointer_move_handler, false)
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.which === 13 && engine.isFullscreen === false) {
      engine.switchFullscreen(true)
      engine.setSize(screen.width, screen.height)

      canvas.focus()
    }
  }, false)
})
