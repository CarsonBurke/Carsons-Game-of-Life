class GameObject {
    constructor(opts) {

        const gameObject = this

        //

        for (const propertyName in opts) {

            gameObject[propertyName] = opts[propertyName]
        }

        //

        gameObject.id = newId()

        // Designate right and bottom

        gameObject.bottom = gameObject.top + gameObject.height
        gameObject.right = gameObject.left + gameObject.width

        //
        
        gameObject.findGame().objects[gameObject.type][gameObject.id] = gameObject
    }
}

class Player extends GameObject {
    constructor(opts) {

        super(opts)
    }
}

class Food extends GameObject {
    constructor(opts) {

        super(opts)
    }
}