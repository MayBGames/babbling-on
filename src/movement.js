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

const DIRECTION = {
  t: (stop) => MOVE.Z = stop === 'STOP' ? 0 : pos(),
  h: (stop) => MOVE.X = stop === 'STOP' ? 0 : pos(),
  g: (stop) => MOVE.Z = stop === 'STOP' ? 0 : neg(),
  f: (stop) => MOVE.X = stop === 'STOP' ? 0 : neg()
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

const register_move_action_handler = (key, scene, me) => {
  register_action(KEY_DOWN, key, scene, () => {
    if (KEYS_DOWN[key] === undefined) {
      KEYS_DOWN[key] = Date.now()

      DIRECTION[key]('GO')
    }
    
    process_player_move(me)
  })
}

const register_jump_handler = (scene, me) => {
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      { trigger: KEY_DOWN, parameter: ' ' },
      () => me.physicsImpostor.applyImpulse(new BABYLON.Vector3(0, 8, 0), me.getAbsolutePosition())
    )
  )
}

const init_controls = (scene, me) => {
  [ 't', 'g', 'f', 'h' ].forEach((key) => {
    register_move_action_handler(key, scene, me)
    
    register_action(KEY_UP, key, scene, () => {
      if (KEYS_UP[key] === undefined)
        KEYS_UP[key] = Date.now()
    })
  })

  register_jump_handler(scene, me)
}

export {
  KEYS_DOWN,
  KEYS_UP,
  MOVE_DIVISOR,
  STOP_DELAY,
  MOVE,
  process_player_move,
  init_controls
}