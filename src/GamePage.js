import React from 'react'
import BoardPainter from "./painter/BoardPainter";
import CONST from "./CONST";
import Location from "./game/Location";
import Game from "./game/Game";
import IntersectionPainter from "./painter/IntersectionPainter";

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.game = new Game(this);
    }

    render() {
        return (
            <canvas ref={this.canvas} width={CONST.START_X * 2 + CONST.PIX} height={CONST.START_X * 2 + CONST.PIX + 200}>
                您的浏览器不支持canvas，请更换浏览器.
            </canvas>
        );
    }

    update() {
        const canvas = this.canvas.current;
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, CONST.START_X * 2 + CONST.PIX, CONST.START_X * 2 + CONST.PIX + 200);

            if (this.boardPainter == null)
                this.boardPainter = new BoardPainter(this);
            this.boardPainter.paint(ctx);

            if (this.intersectionPainter == null)
                this.intersectionPainter = new IntersectionPainter(this.game.battleField);
            this.intersectionPainter.paint(ctx);
        }
    }

    componentDidMount() {
        // this.update();
        const canvas = this.canvas.current;
        canvas.addEventListener("click", event =>  {
            let location = getLocationFromOffset(event.offsetX, event.offsetY);
            this.game.clickOnLocation(location);
        });
    }
}

let getLocationFromOffset = function (x, y) {
    const width = CONST.PIX;
    const height = CONST.PIX;
    const count = CONST.SIZE;

    let resultX = Math.round((x - CONST.START_X) / (width / (count - 1)));
    let resultY = Math.round((y - CONST.START_Y) / (height / (count - 1)));

    if (resultX < 0) resultX = 0;
    if (resultX > count - 1) resultX = count - 1;
    if (resultY < 0) resultY = 0;
    if (resultY > count - 1) resultY = count - 1;

    return new Location(resultX, resultY);
};

export default GamePage