import CONST from "../CONST";
import Location from "../game/Location";

class IntersectionPainter {
    constructor(battleField) {
        IntersectionPainter.battleField = battleField;
    }

    paint(ctx) {
        const count = CONST.SIZE;

        const intersections = IntersectionPainter.battleField.getIntersectionsWithRole();
        intersections.forEach(intersection => {
            const location = intersection.role.location;
            const unit = CONST.PIX / (count - 1);
            const x = unit * location.x + CONST.START_X;
            const y = unit * location.y + CONST.START_Y;

            ctx.fillStyle = intersection.role.kingdom.color;

            if (intersection.picked === true) {
                ctx.strokeStyle = "white";
                ctx.beginPath();

                ctx.moveTo(x - 0.5 * unit, y - 0.5 * unit);
                ctx.lineTo(x - 0.25 * unit, y - 0.5 * unit);

                ctx.moveTo(x + 0.25 * unit, y - 0.5 * unit);
                ctx.lineTo(x + 0.5 * unit, y - 0.5 * unit);

                ctx.moveTo(x - 0.5 * unit, y + 0.5 * unit);
                ctx.lineTo(x - 0.25 * unit, y + 0.5 * unit);

                ctx.moveTo(x + 0.25 * unit, y + 0.5 * unit);
                ctx.lineTo(x + 0.5 * unit, y + 0.5 * unit);

                ctx.moveTo(x - 0.5 * unit, y - 0.5 * unit);
                ctx.lineTo(x - 0.5 * unit, y - 0.25 * unit);

                ctx.moveTo(x - 0.5 * unit, y + 0.5 * unit);
                ctx.lineTo(x - 0.5 * unit, y + 0.25 * unit);

                ctx.moveTo(x + 0.5 * unit, y - 0.5 * unit);
                ctx.lineTo(x + 0.5 * unit, y - 0.25 * unit);

                ctx.moveTo(x + 0.5 * unit, y + 0.5 * unit);
                ctx.lineTo(x + 0.5 * unit, y + 0.25 * unit);

                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(x, y, unit * 0.4, 0, Math.PI * 2, true);
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
            ctx.textAlign = 'center';//设置文本的水平对齐方式
            ctx.font = "16px serif";
            ctx.fillText(intersection.role.res, x, y);
        });
    }
}

export default IntersectionPainter