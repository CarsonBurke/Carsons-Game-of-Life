let tick = 0
let playerCount = 0
let bestScore = 0

function runTick() {

    tick += 1

    const game = games[Object.keys(games)[0]]

    const players = Object.values(game.objects.player)
    playerCount = players.length

    runBatch(players, food)
    foodManager(food)

    bestPlayerManager(players)

    display()
    animate()
}

function runBatch(players) {

    const game = games[Object.keys(games)[0]]

    for (const player of players) {

        /* const distanceFromClosestFood = closestFood ? findDistance(player, closestFood) : 0 */
        
        const inputs = [
            {
                name: 'Players in range',
                value: findPlayersInRange
            },
        ]
        player.inputs = inputs

        const outputs = [
            { name: 'Move forward' },
            { name: 'Rotate clockwise' },
            { name: 'Rotate counter-clockwise' },
        ]
        player.outputs = outputs

        // Create network if player doesn't have one

        if (!player.network) player.createNetwork(inputs, outputs)

        // Run network

        player.network.forwardPropagate(inputs)

        //

        player.network.visualsParent.classList.remove('visualsParentShow')

        // Find last layer

        const lastLayer = player.network.layers[Object.keys(player.network.layers).length - 1]

        // Track iterations and loop through output perceptrons

        let i = -1

        for (const perceptronName in lastLayer.perceptrons) {

            const perceptron = lastLayer.perceptrons[perceptronName]

            // Record iteration

            i++

            // Iterate if output is 0

            if (perceptron.activateValue > 0) {

                // Take action connected to output

                if (i == 0) {

                    let left = player.left + player.speed * Math.cos(player.angle)
                    let top = player.top + player.speed * Math.sin(player.angle)
                    
                    player.move(left, top)
                    continue
                }
                if (i == 1) {

                    player.rotateClockwise()
                    break
                }
                if (i == 2) {

                    player.rotateCounterClockwise()
                    break
                }
            }
        }

        if (Object.keys(game.objects.player).length == 1) return

        player.age()

        player.eatAttempt(closestFood)

        player.reproduceAttempt(tick, players.length)
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

            const duplicateNetwork = bestPlayer.network.clone(bestPlayer.inputs, bestPlayer.outputs)

            game.createPlayer(80 + 38 / 2, 80, 90, duplicateNetwork.learn(), 0)
        }

        return
    }

    //

    bestPlayer.network.updateVisuals(bestPlayer.inputs, bestPlayer.outputs)

    bestPlayer.network.visualsParent.classList.add('visualsParentShow')

    // If bestPlayer's score is is more than bestScore set bestScore to bestPlayer's score

    if (bestPlayer.score > bestScore) bestScore = bestPlayer.score
}

function display() {

    const displayValues = {
        tick: tick,
        playerCount, playerCount,
        bestScore: bestScore,
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

            if (type == 'player') {

                object.rotate()
                continue
            }

            object.draw()
        }
    }
}