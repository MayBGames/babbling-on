import {
  init_controls,
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

const canvas = document.getElementsByTagName('canvas')[0]

canvas.style.width  = window.innerWidth  + 'px'
canvas.style.height = window.innerHeight + 'px'

window.addEventListener('DOMContentLoaded', () => {
  const engine = new BABYLON.Engine(canvas, true)
  const scene  = create_scene(engine)
  const me     = create_player(scene)
  const plane  = create_ground(scene)

  create_sun(scene, [ me ])
  
  init_controls(scene, me)

  scene.activeCamera = create_camera(canvas, scene, me)

  canvas.focus()

  engine.runRenderLoop(() => {
    process_player_move(me)
    
    scene.render()
  })
})
