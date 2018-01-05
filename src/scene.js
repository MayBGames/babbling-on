const GRAVITY = -9.81

const create_scene = (engine) => {
  const scene = new BABYLON.Scene(engine)

  scene.collisionsEnabled = true

  scene.enablePhysics(new BABYLON.Vector3(0, GRAVITY, 0))
  scene.getPhysicsEngine().setTimeStep(1 / 20)

  scene.clearColor    = new BABYLON.Color3(0.75, 0.75, 0)
  scene.actionManager = new BABYLON.ActionManager(scene)

  return scene
}

export {
  GRAVITY,
  create_scene
}