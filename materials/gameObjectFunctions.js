GameObject.prototype.draw = function() {

    const gameObject = this

    // Find imageEl based on gameObject's imageID

    const imageEl = document.getElementById(gameObject.imageID)

    // Draw image using gameObject's properties

    map.cr.drawImage(imageEl, gameObject.left, gameObject.top, gameObject.width, gameObject.height)
}

GameObject.prototype.move = function(x, y) {

    const gameObject = this

    // Apply map borders

    applyMapBorders()

    function applyMapBorders() {

        if (x <= 0) {

            x = 0
            return
        }

        if (x + gameObject.width >= map.el.width) {

            x = map.el.width - gameObject.width
            return
        }
    
        if (y <= 0) {

            y = 0
            return
        }

        if (y + gameObject.height >= map.el.height) {

            y = map.el.height - gameObject.height
            return
        }
    }

    //
    
    gameObject.left = x
    gameObject.top = y
}

GameObject.prototype.delete = function() {

    const gameObject = this
    
    delete gameObject.findGame().objects[gameObject.type][gameObject.id]
}

GameObject.prototype.findGame = function() {

    const gameObject = this

    return games[gameObject.gameID]
}