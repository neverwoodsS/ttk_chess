import {Shu, Wei, Wu} from "../kingdom/Kingdom";
import {Submit, Waiting} from "../control/Control";
import BattleField from "./BattleField";
import Watcher from "./Watcher";

class Game {
    constructor(gamePage) {
        console.log("new Game");
        this.gamePage = gamePage;

        this._initKingdoms();
        this._initBattleField();
        this._initWatcher();
        this._initControls();

        this._startControl(this._wei);
        this._startControl(this._shu);
        this._startControl(this._wu);
    }

    clickOnLocation(location) {
        let intersection = this.battleField.getIntersection(location);
        console.log("controls.size=" + this._controls.size);
        this._controls.forEach(function (control) {
            control.clickAtIntersection(intersection);
        })
    }

    countBlockOfRoute(route) {
        return this.battleField.countBlockOfRoute(route);
    }

    _initKingdoms() {
        this._wei = new Wei(this);
        this._shu = new Shu(this);
        this._wu = new Wu(this);
    }

    _initBattleField() {
        this.battleField = new BattleField();
        this.battleField.addRoles(this._wei.roles);
        this.battleField.addRoles(this._shu.roles);
        this.battleField.addRoles(this._wu.roles);
    }

    _initWatcher() {
        this._watcher = new Watcher(this._wu, this._wei, this._shu);
        this.theMovingKingdom = this._watcher.currentKingdom;
    }

    _initControls() {
        this._controls = new Map();
        this._controls.set(this._wei, new Waiting(this._wei, this));
        this._controls.set(this._shu, new Waiting(this._shu, this));
        this._controls.set(this._wu, new Waiting(this._wu, this));
    }

    async _startControl(kingdom) {
        this._controls.get(kingdom).movingKingdomChange(this.theMovingKingdom);
        while (true) {
            let control = this._controls.get(kingdom);
            if (control != null) {
                let futureControl = await control.process();
                this._controls.set(kingdom, futureControl);

                if (futureControl instanceof Submit) {
                    this._submit(futureControl);
                }

                this.gamePage.update();
            }
        }
    }

    _submit(submit) {
        const winner = submit.from.role;
        const loser = submit.to.role;

        if (loser != null) {
            loser.died = true;
        }

        // 新位置更新
        winner.location = submit.to.toLocation();
        submit.to.role = winner;

        // 旧位置更新
        submit.from.role = null;

        // 通知 watcher 进行逻辑处理
        this._watcher.work();

        this._turnToNextKingdom();
    }

    _turnToNextKingdom() {
        this.theMovingKingdom = this._watcher.currentKingdom;
        this._controls.forEach(control => {
            control.movingKingdomChange(this.theMovingKingdom)
        });
    }
}

export default Game