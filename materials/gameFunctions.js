Game.prototype.createPlayer = function(left, top, degree, network, tick) {

    const game = this

    // If positions aren't provided

    if (!left && !top) {

        // Create them

        left = Math.random() * map.el.width
        top = Math.random() * map.el.height
    }

    // opts for player

    const width = 38
    const height = 58

    // Create player

    const player = new Player({
        type: "player",
        left: randomValue(left - width * 0.5 , map.el.width - width),
        top: randomValue(left - height * 0.5 , map.el.height - height),
        width: width,
        height: height,
        imageID: 'player',
        score: 0,
        health: randomValue(3, 9),
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

Game.prototype.createFood = function() {

    const game = this

    // opts for food

    const width = 30
    const height = 30

    // Random spawn position

    let min = width * 4
    let max = map.el.width - width * 2

    let left = 0

    while (left < min || left > max) {

        left = Math.random() * map.el.width
    }

    min = height * 4
    max = map.el.height - height * 2

    let top = 0

    while (top < min || top > max) {

        top = Math.random() * map.el.width
    }

    for (const foodPart of Object.values(game.objects.food)) {

        // If foodPart is positions this then stop

        if (findDistance({ left: left, top: top, width: width, height: height }, foodPart) - foodPart.width * 2 <= 0) {

            return
        } 
    }

    // Create food

    const food = new Food({
        type: "food",
        left: left - width * 0.5,
        top: top - height * 0.5,
        width: width,
        height: height,
        imageID: 'food',
        gameID: game.id,
    })
    food.draw()

    // Assign food to game
    
    game.objects.food[food.id] = food
}