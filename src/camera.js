const create_camera = (canvas, scene, me) => {
  const camera = new BABYLON.FollowCamera('follower', me.position, scene)

  camera.radius = 15
  camera.heightOffset = 2
  camera.rotationOffset = 180
  camera.cameraAcceleration = 0.5
  camera.maxCameraSpeed = 10
  camera.attachControl(canvas, true)
  camera.lockedTarget = me
  camera.checkCollisions = true

  return camera
} 

export { create_camera }