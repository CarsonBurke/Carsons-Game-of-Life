Game.prototype.createPlayer = function(left, top, degree, network, tick) {

    const game = this

    // If positions aren't provided

    if (!left && !top) {

        // Create them

        left = Math.random() * map.el.width
        top = Math.random() * map.el.height
    }

    // opts for player

    const width = 19
    const height = 29

    // Create player

    const player = new Player({
        type: "player",
        left: left,
        top: top,
        width: width,
        height: height,
        imageID: 'player',
        score: 0,
        health: randomValue(2, 12),
        ageAmount: 0.01,
        food: 0,
        birthDelay: randomValue(50, 200),
        lastBirth: tick + randomValue(100, 200),
        angle: degree * Math.PI / 180,
        rotateSpeed: 0.1,
        speed: 5,
        network: network || undefined,
        gameID: game.id,
    })
    player.draw()

    // Assign player to game
    
    game.objects.player[player.id] = player
}