import {
  KEY_DOWN,
  KEY_UP,
  register_action
} from '/src/shared.js'

const KEYS_DOWN = { }
const KEYS_UP   = { }

let MOVE_DIVISOR = 6
let STOP_DELAY   = 50

const MOVE = { Z: 0, Y: 0, X: 0 }

const FORWARD  = 'w'
const BACKWARD = 's'
const LEFT     = 'a'
const RIGHT    = 'd'

const DIRECTION = {
  [FORWARD]:  (stop) => MOVE.Z = stop === 'STOP' ? 0 : neg(),
  [BACKWARD]: (stop) => MOVE.Z = stop === 'STOP' ? 0 : pos(),
  [LEFT]:     (stop) => MOVE.X = stop === 'STOP' ? 0 : pos(),
  [RIGHT]:    (stop) => MOVE.X = stop === 'STOP' ? 0 : neg()
}

const process_player_move = (me) => {
  for (let key in KEYS_UP)
    if (KEYS_UP[key] !== undefined && Date.now() - KEYS_UP[key] > STOP_DELAY)
      stop_player_move(key)

  me.moveWithCollisions(new BABYLON.Vector3(MOVE.X, MOVE.Y, MOVE.Z))
}

const compute_direction = (direction, power) => parseFloat(Math[direction](power)) / MOVE_DIVISOR

const pos = () => compute_direction('cos',  1)
const neg = () => compute_direction('sin', -1)

const stop_player_move = (key) => {
  DIRECTION[key]('STOP')

  KEYS_DOWN[key] = undefined
  KEYS_UP[key]   = undefined
}

const init_controls = (scene, me) => {
  for (let key of Object.keys(DIRECTION)) {
    register_action(KEY_DOWN, key, scene, () => {
      if (KEYS_DOWN[key] === undefined) {
        KEYS_DOWN[key] = Date.now()

        DIRECTION[key]('GO')
      }

      process_player_move(me)
    })
    
    register_action(KEY_UP, key, scene, () => {
      if (KEYS_UP[key] === undefined)
        KEYS_UP[key] = Date.now()
    })
  }

  register_action(KEY_DOWN, ' ', scene, () => {
    me.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 8, 0), me.getAbsolutePosition())
  })
}


const process_pointer_move = (camera, me) => {
  return (e) => {
    me.rotation.y       += parseFloat(e.movementX / screen.width)
    camera.heightOffset += parseFloat(e.movementY / screen.height)
  }
}

export {
  MOVE,
  process_pointer_move,
  process_player_move,
  init_controls
}