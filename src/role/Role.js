import Location from "../game/Location";

class Role {
    constructor(kingdom, res, acceptableBlockCount) {
        this.kingdom = kingdom;
        this.res = res;
        this.acceptableBlockCount = acceptableBlockCount;
        this.died = false;
    }

    setLocation(location) {
        this.location = location;
    }

    _canMoveTo(location) {
        return false;
    }

    canMoveTo(location, role) {
        let route = this.routeTo(location);

        // 路径不可达直接判定失败
        if (route == null)
            return false;

        // 路径可达，交由 kingdom 判断
        return this.kingdom.canRoleMoveTo(this, role, location, route);
    }

    routeTo(location) {
        return null;
    }
}

class Rook extends Role {
    constructor(kingdom, location, res, acceptableBlockCount) {
        super(kingdom, "车", 0);
        this.setLocation(location);
    }

    _canMoveTo(targetLocation) {
        let deltaX = targetLocation.x - this.location.x;
        let deltaY = targetLocation.y - this.location.y;
        return deltaX * deltaY === 0 && deltaX + deltaY !== 0;
    }

    routeTo(targetLocation) {
        if (this._canMoveTo(targetLocation)) {
            let result = [];

            let deltaX = targetLocation.x - this.location.x;
            let deltaY = targetLocation.y - this.location.y;
            if (deltaX === 0) {
                let unit1 = deltaY > 0 ? 1 : -1;
                for (let y = this.location.y; targetLocation.y - y !== unit1; y += unit1) {
                    result.push(new Location(this.location.x, y + unit1));
                }
            } else {
                let unit2 = deltaX > 0 ? 1 : -1;
                for (let x = this.location.x; targetLocation.x - x !== unit2; x += unit2) {
                    result.push(new Location(x + unit2, this.location.y));
                }
            }
            return result;
        }
        return null;
    }
}

class Soldier extends Role {
    constructor(kingdom, location) {
        super(kingdom, "兵", 0);
        this.setLocation(location)
    }

    _canMoveTo(targetLocation) {
        let distance = Math.abs(targetLocation.x - this.location.x) + Math.abs(targetLocation.y - this.location.y);
        console.log("distance=" + distance);
        return distance === 1;
    }

    routeTo(location) {
        return this._canMoveTo(location) ? [] : null
    }
}

class Guard extends Role {
    constructor(kingdom, location) {
        super(kingdom, "士", 0);
        this.setLocation(location)
    }

    _canMoveTo(targetLocation) {
        let deltaX = targetLocation.x - this.location.x;
        let deltaY = targetLocation.y - this.location.y;
        return Math.abs(deltaX) === Math.abs(deltaY) && Math.abs(deltaX) === 1;
    }

    routeTo(targetLocation) {
        return this._canMoveTo(targetLocation) ? [] : null
    }
}

class Knight extends Role {
    constructor(kingdom, location) {
        super(kingdom, "马", 0);
        this.setLocation(location)
    }

    _canMoveTo(targetLocation) {
        let area = (targetLocation.x - this.location.x) * (targetLocation.y - this.location.y);
        return Math.abs(area) === 2;
    }

    routeTo(targetLocation) {
        if (this._canMoveTo(targetLocation)) {
            let result = [];
            let deltaX = targetLocation.x - this.location.x;
            let deltaY = targetLocation.y - this.location.y;

            if (Math.abs(deltaX) === 2) {
                result.push(Location(this.location.x + Math.round(deltaX / 2), this.location.y))
            } else {
                result.push(Location(this.location.x, this.location.y + Math.round(deltaY / 2)))
            }

            return result;
        }

        return null;
    }
}

class Minister extends Role {
    constructor(kingdom, location) {
        super(kingdom, "相", 0);
        this.setLocation(location)
    }

    _canMoveTo(targetLocation) {
        let deltaX = targetLocation.x - this.location.x;
        let deltaY = targetLocation.y - this.location.y;
        return Math.abs(deltaX) === Math.abs(deltaY) && Math.abs(deltaX) === 2;
    }

    routeTo(targetLocation) {
        if (this._canMoveTo(targetLocation)) {
            return [Location(Math.round((targetLocation.x + this.location.x) / 2), Math.round((targetLocation.y + this.location.y) / 2))];
        }

        return null;
    }
}



class Cannon extends Rook {
    constructor(kingdom, location) {
        super(kingdom, location);
        this.res = "炮";
        this.acceptableBlockCount = 1;
    }
}

class King extends Soldier {
    constructor(kingdom, location, res) {
        super(kingdom, location);
        this.res = res;
    }
}








export { Rook, Soldier, Guard, Knight, Minister, Cannon, King }