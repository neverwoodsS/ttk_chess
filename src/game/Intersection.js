import CONST from "../CONST";
import Location from "./Location";

const _MIN = CONST.DESERT;
const _MAX = CONST.SIZE - CONST.DESERT - 1;

class Intersection {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.picked = false;

        this.desert = (x < _MIN || x > _MAX) && (y < _MIN || y > _MAX);
    }

    setRole(role) {
        this.role = role;
    }

    toLocation() {
        return new Location(this.x, this.y);
    }
}

export default Intersection