const game = createGame({
  title: "Character Voice Demo",
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
    position: [3, 3]
  },
  templates: {
    // Friendly robot
    r: {
      sprite: `
        .222222.
        .322232.
        .422242.
        .422242.
        .222222.
        .222222.
        ..2..2..
        .22..22.
      `,
      dialog: "Hey there, pal!|I'm a friendly robot.|*bzzt* *beep*",
      sound: ["BLIP", 123],
      onCollide: async () => {
        await game.openDialog("*BEEP BEEP*|Hello human!|I am a friendly robot.|*mechanical whirring*")
      }
    },
    
    // Voice demo character
    v: {
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
      dialog: "Testing character voices...",
      sound: ["PICKUP", 456],
      onCollide: async () => {
        console.log("Voice demo character triggered!")
        
        // Use bracket notation to avoid TypeScript errors
        const voiceMethod = game['openDialogWithVoice']
        
        if (voiceMethod && typeof voiceMethod === 'function') {
          console.log("Using openDialogWithVoice method")
          try {
            await voiceMethod.call(game, "*Low robot voice*", "BOSS")
            await voiceMethod.call(game, "*High pitched beeping*", "PAPYRUS") 
            await voiceMethod.call(game, "*Friendly chatter*", "FRIENDLY")
            await voiceMethod.call(game, "*Robotic sounds*", "ROBOT")
          } catch (e) {
            console.log("Voice method error:", e)
          }
        } else {
          console.log("Using fallback method with individual sounds")
          // Fallback with proper sound syntax
          await game.playSound('HIT')
          await game.openDialog("*Low robot voice*")
          
          await game.playSound('PICKUP')
          await game.openDialog("*High pitched beeping*")
          
          await game.playSound('POWERUP')
          await game.openDialog("*Friendly chatter*")
          
          await game.playSound('LASER')
          await game.openDialog("*Robotic sounds*")
        }
      }
    },

    // Wall
    x: {
      sprite: 2,
      solid: true
    }
  },
  map: `
    xxxxxxxx
    x......x
    x..r...x
    x......x
    x......x
    x..v...x
    x......x
    xxxxxxxx
  `,
  background: 9
})