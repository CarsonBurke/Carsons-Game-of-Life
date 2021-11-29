function init() {

    map.cr = map.el.getContext("2d")

    // Style map width and height

    map.el.classList.add('map')

    map.el.width = mapWidth
    map.el.height = mapHeight

    // Disable anti aliasing

    map.cr.imageSmoothingEnabled = false

    // Generate initlal world

    const game = new Game()

    for (let i = 0; i < startingPlayers; i++) {

        game.createPlayer(randomValue(38, map.el.width - 38 * 2), randomValue(20, map.el.height - 58 * 2), 90, undefined, 0)
    }
}