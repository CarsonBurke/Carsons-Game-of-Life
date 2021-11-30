let tick = 0
let playerCount = 0

function runTick() {

    tick += 1

    const game = games[Object.keys(games)[0]]

    const players = Object.values(game.objects.player)
    playerCount = players.length

    runBatch(players)

    bestPlayerManager(players)

    display()
    animate()
}

function findClosestPlayer(player, players) {

    players = players.filter(otherPlayer => otherPlayer.id != player.id)

    const playersByDistance = players.sort((a, b) => findDistance(player, a) - findDistance(player, b))
    playersByDistance.reverse()
    return playersByDistance[0]
}

function runBatch(players) {

    const game = games[Object.keys(games)[0]]

    for (const player of players) {
        
        const playersInRange = player.findPlayersInRange(players)

        //

        if (Object.keys(game.objects.player).length == 1) return

        // 

        if(player.applyMapBorders()) player.kill()

        //


        player.age()
        player.health -= playersInRange * 0.1

        if (player.health <= 0) player.kill()

        if (playersInRange > 1 && playersInRange < 3) {

            player.reproduceAttempt(tick, players.length)
        }
    }
}

function findBestPlayer(players) {

    // Sort players by score and inform player with most score

    const playersByScore = players.sort((a, b) => a.score - b.score)
    playersByScore.reverse()
    return playersByScore[0]
}

function bestPlayerManager(players) {

    const game = games[Object.keys(games)[0]]

    const bestPlayer = findBestPlayer(players)
    if (!bestPlayer) return

    if (players.length == 1) {
        for (let i = 0; i < startingPlayers; i++) {

            game.createPlayer(randomValue(38, map.el.width - 38 * 2), randomValue(20, map.el.height - 58 * 2), 0, undefined, 0)
        }

        return
    }

    //

    // If bestPlayer's score is is more than bestScore set bestScore to bestPlayer's score

    if (bestPlayer.score > bestScore) bestScore = bestPlayer.score
}

function display() {

    const displayValues = {
        tick: tick,
        playerCount, playerCount,
    }

    // Loop through displayValues

    for (const valueName in displayValues) {

        const displayValue = displayValues[valueName]

        // Find element with displayValue as id and set text to displayValue
        
        const el = document.getElementById(valueName)
        el.innerText = displayValue
    }
}

function animate() {

    // Stop if animateTickSkip is valid for this tick

    if (tick % animateTickSkip != 0) return

    const game = games[Object.keys(games)[0]]

    // Store the current transformation matrix

    map.cr.save()

    // Use the identity matrix while clearing the canvas

    map.cr.setTransform(1, 0, 0, 1, 0, 0)
    map.cr.clearRect(0, 0, map.el.width, map.el.height)

    // Restore the transform

    map.cr.restore()

    const objects = game.objects
    
    for (const type in objects) {

        for (const id in objects[type]) {

            const object = objects[type][id]

            object.draw()
        }
    }
}