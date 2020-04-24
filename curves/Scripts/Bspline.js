import { Vector2 } from "./Vector2.js";
import { Line_strip } from "./Line_strip.js";
import { init } from "./Util/Array.js";
init();
export class Bspline {
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== CONSTRUCTOR
    constructor(control_points) {
        this.knots = new Array();
        this.dp = new Line_strip(); //draw points
        this.degree = 1;
        //draw points amount control parameters
        this.dist_treshold = 2; //minimum distance between evaluated draw points
        this.dist_treshold2 = this.dist_treshold * this.dist_treshold; //minimum distance between evaluated draw points
        this.depth_treshold = 10; //maximum recursion
        this.cp = control_points;
        //TODO the following knots distribution forces
        //a curve which degree is equal to the number of points - 1
        //(aka maximum degree for the given amount of points)
        this.knots.resize(this.cp.size(), 0);
        this.knots.resize(this.cp.size() * 2, 1);
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== METHODS
    get_cp(index) { return this.cp[index]; }
    evaluate_draw_points() {
        this.dp.clear();
        this.degree = this.cp.size() - 1;
        this.dp.push(this.get_cp(0));
        this.eval_dp(0, 1, 0);
    }
    eval_dp(beg, end, depth) {
        const a = this.bspline_point(beg);
        const b = this.bspline_point(end);
        if (depth === this.depth_treshold || Vector2.distance2(a, b) < this.dist_treshold2) {
            this.dp.push(b);
            return end;
        }
        else {
            return this.eval_dp(this.eval_dp(beg, (beg + end) / 2, depth + 1), end, depth + 1);
        }
    }
    Nip(i, t) {
        //i = point index
        //t = t (like bezier's t but for the whole spline)
        const d = this.degree; //degree
        const N = new Array(d + 1);
        let saved;
        let temp;
        const m = this.knots.size() - 1;
        if ((i === 0 && t === this.knots[0]) || (i === (m - d - 1) && t === this.knots[m]))
            return 1;
        if (t < this.knots[i] || t >= this.knots[i + d + 1])
            return 0;
        for (let j = 0; j <= d; j++) {
            if (t >= this.knots[i + j] && t < this.knots[i + j + 1])
                N[j] = 1;
            else
                N[j] = 0;
        }
        for (let k = 1; k <= d; k++) {
            if (N[0] === 0)
                saved = 0;
            else
                saved = ((t - this.knots[i]) * N[0]) / (this.knots[i + k] - this.knots[i]);
            for (let j = 0; j < d - k + 1; j++) {
                const Uleft = this.knots[i + j + 1];
                const Uright = this.knots[i + j + k + 1];
                if (N[j + 1] === 0) {
                    N[j] = saved;
                    saved = 0;
                }
                else {
                    temp = N[j + 1] / (Uright - Uleft);
                    N[j] = saved + (Uright - t) * temp;
                    saved = (t - Uleft) * temp;
                }
            }
        }
        return N[0];
    }
    bspline_point(t) {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.cp.size(); i++) {
            const temp = this.Nip(i, t);
            x += this.get_cp(i).x * temp;
            y += this.get_cp(i).y * temp;
        }
        return new Vector2(x, y);
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== DRAW
    set_style(draw_style) { this.dp.set_style(draw_style); }
    draw(ctx) { this.dp.draw(ctx); }
    draw_raw(ctx) { this.dp.draw_raw(ctx); }
    draw_points(ctx) {
        //this.dp.draw_points(ctx);
        this.cp.forEach(function (element) { element.draw(ctx); });
    }
}
//# sourceMappingURL=Bspline.js.map