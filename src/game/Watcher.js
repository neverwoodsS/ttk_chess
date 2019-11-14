class Watcher {
    constructor(one, two, three) {
        one.next = two;
        two.next = three;
        three.next = one;

        this._kingdoms = [one, two, three];
        this.currentKingdom = one;
    }

    work() {
        this._decideNextKingdom();
    }

    _decideNextKingdom() {
        // check next
        let next = this.currentKingdom.next;
        let king = next.king;

        let result = this._kingdoms.flatMap(kingdom => kingdom.roles)
            .filter(role => !role.died)
            .find(role => role.canMoveTo(king.location, king))
        ;

        if (result !== undefined) {
            this.currentKingdom = next;
        }

        // check next.next
        else {
            next = next.next;
            king = next.king;

            result = this._kingdoms.flatMap(kingdom => kingdom.roles)
                .filter(role => !role.died)
                .find(role => role.canMoveTo(king.location, king))
            ;

            if (result !== undefined) {
                this.currentKingdom = next;
            } else {
                this.currentKingdom =  this.currentKingdom.next;
            }
        }
    }
}

export default Watcher