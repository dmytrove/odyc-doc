const game = createGame({
  title: "Audio Test - Loud Sounds",
  player: {
    sprite: 4,
    position: [1, 1]
  },
  templates: {
    // Different sound test characters
    '1': {
      sprite: 1,
      onCollide: async () => {
        console.log("Testing EXPLOSION sound...")
        await game.playSound('EXPLOSION')
        await game.openDialog("Did you hear the EXPLOSION?")
      }
    },
    '2': {
      sprite: 2,
      onCollide: async () => {
        console.log("Testing LASER sound...")
        await game.playSound('LASER')
        await game.openDialog("Did you hear the LASER?")
      }
    },
    '3': {
      sprite: 3,
      onCollide: async () => {
        console.log("Testing POWERUP sound...")
        await game.playSound('POWERUP')
        await game.openDialog("Did you hear the POWERUP?")
      }
    },
    'v': {
      sprite: 5,
      onCollide: async () => {
        console.log("Testing character voices...")
        const voiceMethod = game['openDialogWithVoice']
        if (voiceMethod) {
          await voiceMethod.call(game, "BOSS voice test", "BOSS")
          await voiceMethod.call(game, "ROBOT voice test", "ROBOT")
          await voiceMethod.call(game, "FRIENDLY voice test", "FRIENDLY")
        }
      }
    },
    x: {
      sprite: 6,
      solid: true
    }
  },
  map: `
    xxxxxxx
    x1.2.3x
    x.....x
    x..v..x
    x.....x
    xxxxxxx
  `,
  background: 9
})