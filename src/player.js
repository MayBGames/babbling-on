let current_block_to_collect = 0

const collected_blocks = { H: 0, E: 0, L: 0, P: 0 }

let anim_change_countdown = 0
let anim_phase            = 0

const uvs = [ ]

uvs[0] = new BABYLON.Vector4(1/ 13, 0, 2 / 13, 1)
uvs[1] = new BABYLON.Vector4(0,     0, 1 / 13, 1)
uvs[2] = new BABYLON.Vector4(0,     0, 1 / 13, 1)
uvs[3] = new BABYLON.Vector4(0,     0, 1 / 13, 1)
uvs[4] = new BABYLON.Vector4(0,     0, 1 / 13, 1)
uvs[5] = new BABYLON.Vector4(0,     0, 1 / 13, 1)

const animate_player = (me, scene) => {
  scene.registerAfterRender(() => {
    const frames_per_second         = scene.getEngine().getFps()
    const frames_to_wait_to_animate = frames_per_second / 12

    if (anim_change_countdown++ >= frames_to_wait_to_animate) {
      if (anim_phase === 14)
        anim_phase = 0
      
      uvs[0] = new BABYLON.Vector4((++anim_phase) / 13, 0, (++anim_phase) / 13, 1)

      // me.faceUV = uvs
    }
  })
}

const create_player = (blocks_to_collect, completed_callback, scene) => {
  const player = BABYLON.MeshBuilder.CreateBox('player', { width: 2, height: 3.28, depth: 0.25, faceUV: uvs, updatable: true }, scene)
  
  player.material                 = new BABYLON.StandardMaterial('player_mat',      scene)
  player.material.diffuseTexture  = new BABYLON.Texture('/assets/AOL diffuse.png',  scene)
  player.material.emissiveTexture = new BABYLON.Texture('/assets/AOL emissive.png', scene)
  player.material.bumpTexture     = new BABYLON.Texture('/assets/AOL bump.png',     scene)
  
  player.material.diffuseTexture.hasAlpha = true

  player.position        = new BABYLON.Vector3(0, 2.5, 0)
  player.checkCollisions = true
  player.receiveShadows  = true

  player.rotate(BABYLON.Axis.Z, BABYLON.Tools.ToRadians(180), BABYLON.Space.WORLD)

  player.physicsImpostor = new BABYLON.PhysicsImpostor(player, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0 }, scene)

  player.onCollide = (mesh) => {
    if (mesh.name.match(/letters/g)) {
      const name_tokens = mesh.name.split('/')
      const letter = name_tokens[name_tokens.length - 1]
      
      const b = blocks_to_collect.indexOf(letter)
      
      if (b <= current_block_to_collect) {
        if (collected_blocks[letter]++ < 5)
          mesh.dispose()

        if (collected_blocks[letter] === 5)
          current_block_to_collect += 1

          if (current_block_to_collect === 4) 
          completed_callback()
      }
    }
  }

  return player
}

export {
  create_player,
  animate_player
}