import { Vector2 } from "./Vector2.js";
import { Line_strip } from "./Line_strip.js";
import { init } from "./Util/Array.js";
init();
export class Bezier {
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== CONSTRUCTOR
    constructor(control_points, begin = 0) {
        this.dp = new Line_strip(); //draw points
        //draw points amount control parameters
        this.dist_treshold = 2; //minimum distance between evaluated draw points
        this.dist_treshold2 = this.dist_treshold * this.dist_treshold; //minimum distance between evaluated draw points
        this.depth_treshold = Infinity; //maximum recursion
        this.cp = control_points;
        this.begin = begin;
        this.evaluate_draw_points();
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== METHODS
    get_cp(index) { return this.cp[this.begin + index]; }
    evaluate_draw_points() {
        this.dp.clear();
        this.dp.push(this.bezier_point(0));
        this.eval_dp(0, 1, 0);
        //this.eval_loop();
    }
    /*private eval_loop(): void
        {
        for(let i = 0; i <= 1; i += 0.05) { this.dp.push(this.bezier(i)); }
        }*/
    eval_dp(beg, end, depth) {
        const a = this.bezier_point(beg);
        const b = this.bezier_point(end);
        if (depth === this.depth_treshold || Vector2.distance2(a, b) < this.dist_treshold2) {
            this.dp.push(b);
            return end;
        }
        else {
            return this.eval_dp(this.eval_dp(beg, (beg + end) / 2, depth + 1), end, depth + 1);
        }
    }
    bezier_point(t) {
        const x = Math.pow(1 - t, 3) * this.get_cp(0).x + 3 * t *
            Math.pow(1 - t, 2) * this.get_cp(1).x + 3 *
            Math.pow(t, 2) * (1 - t) * this.get_cp(2).x +
            Math.pow(t, 3) * this.get_cp(3).x;
        const y = Math.pow(1 - t, 3) * this.get_cp(0).y + 3 * t *
            Math.pow(1 - t, 2) * this.get_cp(1).y + 3 *
            Math.pow(t, 2) * (1 - t) * this.get_cp(2).y +
            Math.pow(t, 3) * this.get_cp(3).y;
        return new Vector2(x, y);
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== DRAW
    set_style(draw_style) { this.dp.set_style(draw_style); }
    draw(ctx) {
        /*new Draw_style(Color.red()).apply(ctx);
        ctx.beginPath();
        ctx.moveTo(this.get_cp(0).x, this.get_cp(0).y);
        ctx.bezierCurveTo(this.get_cp(1).x, this.get_cp(1).y, this.get_cp(2).x, this.get_cp(2).y, this.get_cp(3).x, this.get_cp(3).y);
        ctx.stroke();*/
        this.dp.draw(ctx);
    }
    draw_raw(ctx) { this.dp.draw_raw(ctx); }
    draw_points(ctx) {
        //this.dp.draw_points(ctx);
        this.cp.forEach(function (element) { element.draw(ctx); });
    }
}
//# sourceMappingURL=Bezier.js.map