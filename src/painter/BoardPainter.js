import CONST from '../CONST'

class BoardPainter {
    constructor(game) {
        this.game = game;
    }

    paint(ctx) {
        let x = CONST.START_X;
        let y = CONST.START_Y;

        ctx.strokeStyle = 'orange';
        for (let i = 0; i < CONST.SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(CONST.START_X, y);
            ctx.lineTo(CONST.PIX + CONST.START_X, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, CONST.START_Y);
            ctx.lineTo(x, CONST.PIX + CONST.START_Y);
            ctx.stroke();

            x += CONST.STEP_PIX;
            y += CONST.STEP_PIX;
        }
    }
}

export default BoardPainter