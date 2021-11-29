Player.prototype.rotateClockwise = function() {

    const player = this

    player.angle += player.rotateSpeed

    if (player.angle < 0) player.angle = Math.PI * 2
}

Player.prototype.rotateCounterClockwise = function() {

    const player = this

    player.angle -= player.rotateSpeed

    if (player.angle > Math.PI * 2) player.angle = 0
}

Player.prototype.kill = function() {

    const player = this

    // Delete network visuals

    player.network.visualsParent.remove()

    // Delete player

    player.delete()
}

Player.prototype.createNetwork = function(inputs, outputs) {

    const player = this

    // Create neural network

    const network = new NeuralNetwork()

    // Create layers

    const layerCount = 3

    for (let i = 0; i < layerCount; i++) network.addLayer({})

    // Create perceptrons

    // Create input perceptrons

    for (let i = 0; i < inputs.length; i++) network.layers[0].addPerceptron()

    // Create hidden perceptrons

    const hiddenPerceptronsNeed = 4

    // Loop through layers

    for (const layerName in network.layers) {

        // Filter only hidden layers

        const layersCount = Object.keys(network.layers).length

        if (layerName > 0 && layerName < layersCount - 1) {

            const layer = network.layers[layerName]

            for (let i = 0; i < hiddenPerceptronsNeed; i++) layer.addPerceptron()
        }
    }

    // Create output perceptrons

    for (let i = 0; i < outputs.length; i++) network.layers[layerCount - 1].addPerceptron()

    // Initialize network

    network.init(inputs, outputs)

    // Add network to player

    player.network = network
}

Player.prototype.rotate = function() {

    const player = this

    // Store the current context state (i.e. rotation, translation etc..)

    map.cr.save()

    // Set the origin to the center of the image

    map.cr.translate(player.left + player.width / 2, player.top + player.height / 2)

    // Rotate the canvas around the origin

    map.cr.rotate(player.angle + Math.PI / 2)

    // Find imageEl based on gameObject's imageID

    const imageEl = document.getElementById(player.imageID)

    // Draw image using gameObject's properties

    map.cr.drawImage(imageEl, player.width / 2 * -1, player.height / 2 * -1, player.width, player.height)

    // Restore canvas state as saved from above

    map.cr.restore()
}

Player.prototype.reproduceAttempt = function(tick, playersCount) {

    const player = this

    // Stop if there are too many players

    if (playersCount >= maxPlayers) {

        player.lastBirth = tick
        return
    }

    const game = player.findGame()

    // Clone and learn network

    const duplicateNetwork = player.network.clone(player.inputs, player.outputs)
    duplicateNetwork.learn()

    // Create player with network

    game.createPlayer(player.left + player.width / 2, player.top + player.height / 2, player.angle, duplicateNetwork, tick)
}

Player.prototype.findPlayersInRange = function(players) {

    const player = this

    let playersInRangeAmount = 0

    for (const otherPlayer of players) {

        // Find distance between players, iterate if over 200

        const distance = findDistance(player, otherPlayer)
        if (distance > 200) continue

        // Add 1 to playersInRangeAmount

        playersInRangeAmount++
    }

    return playersInRangeAmount
}