let Z = 0
let X = 0

const KEY_DOWN = BABYLON.ActionManager.OnKeyDownTrigger
const KEY_UP   = BABYLON.ActionManager.OnKeyUpTrigger

const register_action = (trigger, key, scene, cb) => {
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      { trigger: trigger, parameter: key },
      () => cb()
  ))
}

export {
  register_action,
  KEY_DOWN,
  KEY_UP
}