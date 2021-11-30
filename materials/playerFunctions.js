Player.prototype.kill = function() {

    const player = this

    // Delete player

    player.delete()
}

Player.prototype.reproduceAttempt = function(tick, playersCount) {

    const player = this

    // Stop if there are too many players

    if (playersCount >= maxPlayers) {

        player.lastBirth = tick
        return
    }

    const game = player.findGame()

    // Create player with network

    game.createPlayer(randomValue(player.left - player.width, player.left + player.width), randomValue(player.top - player.width, player.top + player.width), player.angle, undefined, tick)
}

Player.prototype.findPlayersInRange = function(players) {

    const player = this

    let playersInRangeAmount = 0

    for (const otherPlayer of players) {

        // Find distance between players, iterate if over 200

        const distance = findDistance(player, otherPlayer)
        if (distance > 10) continue

        // Add 1 to playersInRangeAmount

        playersInRangeAmount++
    }

    return playersInRangeAmount
}

Player.prototype.age = function() {

    const player = this

    player.health -= 0.01
}

Player.prototype.applyMapBorders = function() {

    const player = this

    // Apply map borders

    if (player.left <= 0) return true
    if (player.left + player.width >= map.el.width) return true
    if (player.top <= 0) return true
    if (player.top + player.height >= map.el.height) return true
}