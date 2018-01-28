import { init_controls } from '/src/movement.js'
import { create_camera } from '/src/camera.js'
import { create_scene  } from '/src/scene.js'

import {
  create_player,
  animate_player
} from '/src/player.js'

import { create_room   } from '/src/room.js'
import { create_word_cube } from '/src/word_cube.js'

import {
  create_point_lights,
  create_ambient_light
} from '/src/lights.js'

import { generate_reference_blocks } from '/src/reference_blocks.js'

import { letters } from '/src/letters.js'

import { start_ticking } from '/src/countdown_timer.js'

const canvas = document.getElementsByTagName('canvas')[0]

window.addEventListener('DOMContentLoaded', () => {
  const blocks_to_collect = [ 'H', 'E', 'L', 'P' ]
  
  const engine = new BABYLON.Engine(canvas, true, { stencil: true }, false)
  const scene  = create_scene(engine)
  const me     = create_player(blocks_to_collect, scene)

  const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  const text1 = new BABYLON.GUI.TextBlock();

  text1.text = 'foo'

  text1.color = "white"
  text1.fontSize = 24
  text1.resizeToFit = true

  advancedTexture.addControl(text1)
  
  const countdown_ticked = (ticks) => {
    if (parseInt(ticks) > 0) {
      text1.text = ticks
    } else {
      const text2 = new BABYLON.GUI.TextBlock();

      text2.text = 'THANK YOU FOR\nYOUR ASSISTANCE'

      text2.color = "red"
      text2.fontSize = 100
      text2.resizeToFit = true

      advancedTexture.addControl(text2)
    }
  }

  start_ticking(90, countdown_ticked, scene)

  const room = create_room(scene)

  const blocks = generate_reference_blocks(scene)

  for (let l of blocks_to_collect) {
    const x    = Math.random() * 200 - 100
    const z    = Math.random() * 200 - 100
    const cube = create_word_cube(letters[l], new BABYLON.Vector3(x, 1.5, z), scene)

    for (let c in cube)
      room[blocks.length + c] = cube[c]
  }

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
