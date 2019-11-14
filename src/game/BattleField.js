import CONST from "../CONST";
import Intersection from "./Intersection";

let _sections = [];

class BattleField {
    constructor() {
        for (let i = 0; i < CONST.SIZE; i++) {
            _sections.push([]);
            for (let j = 0; j < CONST.SIZE; j++) {
                _sections[i][j] = new Intersection(i, j);
            }
        }
    }

    addRoles(roles) {
        roles.forEach(function (role) {
            _sections[role.location.x][role.location.y].setRole(role);
        });
    }

    countBlockOfRoute(route) {
        let result = 0;
        route.forEach(function (location) {
            if (_sections[location.x][location.y].role != null) {
                result++;
            }
        });
        return result;
    }

    getIntersection(location) {
        return _sections[location.x][location.y];
    }

    getIntersectionsWithRole() {
        let result = [];

        _sections.forEach(function (list) {
            list.forEach(function (section) {
                if (section.role != null) {
                    result.push(section);
                }
            });
        });

        return result;
    }
}

export default BattleField