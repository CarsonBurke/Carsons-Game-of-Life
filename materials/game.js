class Game {
    constructor() {

        const game = this

        //

        game.id = newID()

        //

        game.objects = {
            player: {},
        }

        //

        games[game.id] = game
    }
}