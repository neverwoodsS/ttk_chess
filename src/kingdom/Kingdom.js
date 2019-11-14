import { Soldier, Rook, King, Knight, Guard, Minister, Cannon } from '../role/Role'
import Location from "../game/Location";

class Kingdom {
    constructor(game) {
        this.game = game;
        this.roles = this._initRoles();
        this.color = this._initColor();
        this.name = this._initName();
        this.ally = null;
        this.next = null;
    }

    _initRoles() {
        return [];
    }

    _initColor() {
        return "";
    }

    _initName() {
        return "";
    }

    get king() {
        return this.roles.find(role => role instanceof King);
    }

    canRoleMoveTo(startRole, targetRole, targetLocation, route) {
        let blockCount = this.game.countBlockOfRoute(route);

        // 目标位置没有棋子
        // 一定需要路径没有阻碍
        if (targetRole == null)
            return blockCount === 0;

        // 检查目标位置棋子所属势力
        // 如果是己方、盟友则不可移动
        if (targetRole.kingdom === this || targetRole.kingdom === this.ally)
            return false;

        // 如果是敌对势力
        // 需要路径阻碍数符合棋子自身要求
        // 例如：炮（1），其余（0）
        return blockCount === startRole.acceptableBlockCount;
    }
}

class Wei extends Kingdom {
    _initRoles() {
        return [
            new Soldier(this, new Location(12, 3)),
            new Soldier(this, new Location(10, 3)),
            new Soldier(this, new Location(8, 3)),
            new Soldier(this, new Location(6, 3)),
            new Soldier(this, new Location(4, 3)),
            new Cannon(this, new Location(11, 2)),
            new Cannon(this, new Location(5, 2)),
            new Rook(this, new Location(12, 0)),
            new Rook(this, new Location(4, 0)),
            new Knight(this, new Location(11, 0)),
            new Knight(this, new Location(5, 0)),
            new Minister(this, new Location(10, 0)),
            new Minister(this, new Location(6, 0)),
            new Guard(this, new Location(9, 0)),
            new Guard(this, new Location(7, 0)),
            new King(this, new Location(8, 0), "魏"),
        ];
    }

    _initColor() {
        return "red";
    }

    _initName() {
        return "魏";
    }

    canRoleMoveTo(startRole, targetRole, targetLocation, route) {
        let superResult = super.canRoleMoveTo(startRole, targetRole, targetLocation, route);

        if (superResult) {
            // 相不能离开本土
            if (startRole instanceof Minister && targetLocation.y > 4)
                return false;
            // 士、王不能离开九宫格
            if ((startRole instanceof Guard || startRole instanceof King) && (targetLocation.y > 2 || targetLocation.x < 7 || targetLocation.x > 9))
                return false;
            // 兵在国境线及国境内不能后退
            if (startRole instanceof Soldier && (startRole.location.y <= 4 && targetLocation.y < startRole.location.y))
                return false;
        } else {
            return false
        }

        return true;
    }
}

class Shu extends Kingdom {
    _initRoles() {
        return [
            new Soldier(this, new Location(12, 13)),
            new Soldier(this, new Location(10, 13)),
            new Soldier(this, new Location(8, 13)),
            new Soldier(this, new Location(6, 13)),
            new Soldier(this, new Location(4, 13)),
            new Cannon(this, new Location(11, 14)),
            new Cannon(this, new Location(5, 14)),
            new Rook(this, new Location(12, 16)),
            new Rook(this, new Location(4, 16)),
            new Knight(this, new Location(11, 16)),
            new Knight(this, new Location(5, 16)),
            new Minister(this, new Location(10, 16)),
            new Minister(this, new Location(6, 16)),
            new Guard(this, new Location(9, 16)),
            new Guard(this, new Location(7, 16)),
            new King(this, new Location(8, 16), "蜀"),
        ];
    }

    _initColor() {
        return "green";
    }

    _initName() {
        return "蜀";
    }

    canRoleMoveTo(startRole, targetRole, targetLocation, route) {
        let superResult = super.canRoleMoveTo(startRole, targetRole, targetLocation, route);

        if (superResult) {
            // 相不能离开本土
            if (startRole instanceof Minister && targetLocation.y < 12)
                return false;
            // 士、王不能离开九宫格
            if ((startRole instanceof Guard || startRole instanceof King) && (targetLocation.y < 14 || targetLocation.x < 7 || targetLocation.x > 9))
                return false;
            // 兵在国境线及国境内不能后退
            if (startRole instanceof Soldier && (startRole.location.y >= 12 && targetLocation.y > startRole.location.y))
                return false;
        } else {
            return false
        }

        return true;
    }
}

class Wu extends Kingdom {
    _initRoles() {
        return [
            new Soldier(this, new Location(13, 4)),
            new Soldier(this, new Location(13, 6)),
            new Soldier(this, new Location(13, 8)),
            new Soldier(this, new Location(13, 10)),
            new Soldier(this, new Location(13, 12)),
            new Cannon(this, new Location(14, 5)),
            new Cannon(this, new Location(14, 11)),
            new Rook(this, new Location(16, 4)),
            new Rook(this, new Location(16, 12)),
            new Knight(this, new Location(16, 5)),
            new Knight(this, new Location(16, 11)),
            new Minister(this, new Location(16, 6)),
            new Minister(this, new Location(16, 10)),
            new Guard(this, new Location(16, 7)),
            new Guard(this, new Location(16, 9)),
            new King(this, new Location(16, 8), "吴"),
        ];
    }

    _initColor() {
        return "blue";
    }

    _initName() {
        return "吴";
    }

    canRoleMoveTo(startRole, targetRole, targetLocation, route) {
        let superResult = super.canRoleMoveTo(startRole, targetRole, targetLocation, route);

        if (superResult) {
            // 相不能离开本土
            if (startRole instanceof Minister && targetLocation.x < 12)
                return false;
            // 士、王不能离开九宫格
            if ((startRole instanceof Guard || startRole instanceof King) && (targetLocation.x < 14 || targetLocation.y < 7 || targetLocation.y > 9))
                return false;
            // 兵在国境线及国境内不能后退
            if (startRole instanceof Soldier && (startRole.location.x >= 12 && targetLocation.x > startRole.location.x))
                return false;
        } else {
            return false
        }

        return true;
    }
}

export { Wei, Shu, Wu }