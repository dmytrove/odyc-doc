const game = createGame({
  title: "Voice Test - Simple",
  player: {
    sprite: `
      ..3333..
      .333333.
      33.33.33
      33333333
      .333333.
      ..3333..
      ..3..3..
      .33..33.
    `,
    position: [1, 1]
  },
  templates: {
    // Test character
    t: {
      sprite: `
        ..5555..
        .555555.
        55.55.55
        55555555
        .555555.
        ..5555..
        ..5..5..
        .55..55.
      `,
      onCollide: async () => {
        console.log("=== VOICE TEST STARTED ===")
        console.log("Game object:", game)
        console.log("Available methods:", Object.keys(game))
        
        // Check if voice method exists
        const voiceMethod = game['openDialogWithVoice']
        console.log("Voice method:", voiceMethod)
        console.log("Voice method type:", typeof voiceMethod)
        
        if (voiceMethod) {
          console.log("Testing voice method...")
          try {
            await voiceMethod.call(game, "Testing BOSS voice", "BOSS")
          } catch (e) {
            console.log("Voice method failed:", e)
          }
        } else {
          console.log("Voice method not found, testing fallback...")
          await game.playSound('HIT')
          await game.openDialog("Fallback: BOSS voice")
        }
        
        console.log("=== VOICE TEST ENDED ===")
      }
    },
    
    // Wall
    x: {
      sprite: 2,
      solid: true
    }
  },
  map: `
    xxxx
    x..x
    x.tx
    xxxx
  `,
  background: 9
})