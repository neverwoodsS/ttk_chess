class Control {
    constructor(kingdom, game) {
        this.kingdom = kingdom;
        this.game = game;

        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
        })
    }

    clickAtIntersection(intersection) {}
    movingKingdomChange(movingKingdom) {}

    async process() {
        await this.promise;
    }
}

class Waiting extends Control {
    movingKingdomChange(movingKingdom) {
        console.log("movingKingdom match");
        console.log(Control.resolve);
        if (this.kingdom === movingKingdom) {
            console.log("movingKingdom matched");
            console.log(this.kingdom);
            this.resolve();
        }
    }

    async process() {
        await super.process();
        console.log("waiting process finish");
        return new Thinking(this.kingdom, this.game);
    }
}

class Thinking extends Control {
    clickAtIntersection(intersection) {
        console.log("thinking received a intersection: " + intersection);
        this._clickedIntersection = intersection;

        if (intersection.role != null && this.kingdom === intersection.role.kingdom) {
            this.resolve();
        }
    }

    async process() {
        await super.process();
        return new Picked(this.kingdom, this.game, this._clickedIntersection);
    }
}

class Picked extends Control {
    constructor(kingdom, game, _pickedIntersection) {
        super(kingdom, game);
        this._pickedIntersection = _pickedIntersection;
        _pickedIntersection.picked = true;
    }

    clickAtIntersection(intersection) {
        this._clickedIntersection = intersection;
        this.resolve();
    }

    async process() {
        await super.process();

        let result = this._pickedIntersection.role.canMoveTo(this._clickedIntersection.toLocation(), this._clickedIntersection.role);
        return result ? this._submit() : this._thinking();
    }

    _submit() {
        this._pickedIntersection.picked = false;
        return new Submit(this.kingdom, this.game, this._pickedIntersection, this._clickedIntersection);
    }

    _thinking() {
        this._pickedIntersection.picked = false;
        return new Thinking(this.kingdom, this.game);
    }
}

class Submit extends Control {
    constructor(kingdom, game, from, to) {
        super(kingdom, game);
        this.from = from;
        this.to = to;
    }

    async process() {
        // await super.process();
        return new Waiting(this.kingdom, this.game);
    }
}

export { Waiting, Thinking, Picked, Submit }