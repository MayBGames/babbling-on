const start_ticking = (ticks, callback, scene) => {
  let started = Date.now()
  let ticked  = false
  
  scene.registerAfterRender(() => {
    if (Date.now() - started > 1000) {
      if (ticked === false) {
        callback(ticks.toString())

        --ticks

        started = Date.now()

        ticked = true
      }
    } else {
      ticked = false
    }
  })
}

export {
  start_ticking
}