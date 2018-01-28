import {
  KEY_DOWN,
  KEY_UP,
  register_action
} from '/src/shared.js'

const FORWARD  = 'w'
const BACKWARD = 's'
const LEFT     = 'a'
const RIGHT    = 'd'

const DIRECTIONS = [
  FORWARD,
  BACKWARD,
  LEFT,
  RIGHT
]

const keys_down = { }

const mouse_movement = {
  x: 0,
  y: 0
}

const rotation = {
  total:      0,
  this_frame: 0
}

const turning_radius = {
  current: 0,
  next:    0
}

const character = {
  length:   1,
  width:    1,
  rotation: 0
}

const distance_per_second = {
  x: 0,
  y: 0,
  z: 0
}

let frames_per_second = 0

let last_mouse_movement = 0

let move_by = 0

const jump = {
  base:     undefined,
  crest:    undefined,
  position: 0,
  rising:   false,
  falling:  false
}

const init_controls = (engine, scene, me) => {
  for (let key of DIRECTIONS) {
    register_action(KEY_DOWN, key, scene, () => {
      if (keys_down[key] === undefined)
        keys_down[key] = Date.now()
    })

    register_action(KEY_UP, key, scene, () => {
      if (keys_down[key] > 0)
        keys_down[key] = undefined
    })
  }

  const canvas = document.getElementsByTagName('canvas')[0]

  let original_canvas_width  = canvas.width
  let original_canvas_height = canvas.height

  const pointer_move_handler = process_pointer_move(scene)

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

  scene.registerAfterRender(() => {
    frames_per_second = scene.getEngine().getFps()

    for (let key of DIRECTIONS) {
      switch (key) {
        case FORWARD:
          if (keys_down[FORWARD] > 0 && distance_per_second.z < 50)
            distance_per_second.z += 1
          else if (keys_down[FORWARD] === undefined)
            if (distance_per_second.z > 0)
              distance_per_second.z -= 1
          break
        case BACKWARD:
          if (keys_down[BACKWARD] > 0 && distance_per_second.z > -50)
            distance_per_second.z -= 1
          else if (keys_down[BACKWARD] === undefined)
            if (distance_per_second.z < 0)
              distance_per_second.z += 1
          break
        case RIGHT:
          if (keys_down[RIGHT] > 0 && distance_per_second.x < 50)
            distance_per_second.x += 1
          else if (keys_down[RIGHT] === undefined)
            if (distance_per_second.x > 0)
              distance_per_second.x -= 1
          break
        case LEFT:
          if (keys_down[LEFT] > 0 && distance_per_second.x > -50)
            distance_per_second.x -= 1
          else if (keys_down[LEFT] === undefined)
            if (distance_per_second.x < 0)
              distance_per_second.x += 1
          break
      }
    }

    if (last_mouse_movement !== mouse_movement.x) {
      rotation.this_frame  = ((mouse_movement.x * 25) * 0.00001) / Math.PI
      rotation.total      += rotation.this_frame

      turning_radius.next    = character.length / 2 + character.width / Math.tan(rotation.total)
      turning_radius.current = turning_radius.next

      last_mouse_movement = mouse_movement.x
    } else {
      rotation.this_frame = 0
      rotation.total      = 0

      turning_radius.current = 0
      turning_radius.next    = 0
    }

    if (turning_radius.current !== 0) {
      const speed = distance_per_second > 0 ? distance_per_second : 50

      character.rotation = speed / (turning_radius.current * frames_per_second)

      me.rotate(BABYLON.Axis.Y, character.rotation, BABYLON.Space.WORLD)

      move_by += character.rotation
    }

    let temp_z = 0
    let temp_x = 0
    let temp_y = 0

    if (distance_per_second.z !== 0) {
      const distance_this_frame = parseFloat(-distance_per_second.z / frames_per_second)

      temp_z += Math.cos(move_by) * distance_this_frame
      temp_x += Math.sin(move_by) * distance_this_frame
    }

    if (distance_per_second.x !== 0) {
      const distance_this_frame = parseFloat(-distance_per_second.x / frames_per_second)

      temp_z += (parseFloat(Math.sin(parseFloat(-move_by))) * distance_this_frame) * (Math.PI / 4)
      temp_x += (parseFloat(Math.cos(parseFloat(-move_by))) * distance_this_frame) * (Math.PI / 4)
    }

    if (jump.rising === true || jump.falling === true) {
      distance_per_second.y = Math.abs(jump.crest - jump.base) * 0.25

      const distance_this_frame = parseFloat(distance_per_second.y / (frames_per_second * 0.6))
      const vertical_movement   = Math.abs(jump.crest - jump.base) * distance_this_frame

      if (jump.rising === true) {
        if (me.position.y < jump.crest) {
          jump.position += vertical_movement
          temp_y = jump.position
        } else {
          jump.rising  = false
          jump.falling = true
        }
      } else if (jump.falling === true) {
        if (me.position.y - jump.base > 0.01) {
          jump.position -= vertical_movement
          temp_y = jump.position
        } else {
          jump.base     = undefined
          jump.crest    = undefined
          jump.position = 0
          jump.rising   = false
          jump.falling  = false
        }
      }
    } else {
      temp_y = -9.81 / frames_per_second
    }

    me.moveWithCollisions(new BABYLON.Vector3(temp_x, temp_y, temp_z))
  })

  register_action(KEY_DOWN, ' ', scene, () => {
    if (jump.base === undefined) {
      jump.base     = me.getAbsolutePosition().y
      jump.crest    = jump.base + 4
      jump.position = 0
      jump.rising   = true
      jump.falling  = false
    }
  })
}

const process_pointer_move = (scene) => {
  return (e) => {
    mouse_movement.y = e.movementY * 0.125
    mouse_movement.x = e.movementX * 0.25

    if (e.movementY !== 0) {
      const x_rotate_amount = parseFloat(mouse_movement.y / (180 * Math.PI))

      scene.activeCamera.heightOffset += x_rotate_amount
    }
  }
}

export {
  init_controls
}