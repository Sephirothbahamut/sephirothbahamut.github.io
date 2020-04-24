import { Vector2 } from "./Vector2.js";
import { Line_strip } from "./Line_strip.js";
import { Bezier } from "./Bezier.js";
import { Bspline } from "./Bspline.js";
import { Nurbs } from "./Nurbs.js";
import { init } from "./Util/Array.js";
init();
import { Draw_style, Color, Stroke } from "./Util/HTML/Draw_style.js";
export class Lines_manager {
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== CONSTRUCTOR
    constructor() {
        this.selected = null;
        this.selected_id = NaN;
        this.from = new Vector2(0, 0);
        this.arr = [];
        this.beziers = [];
        this.glued_dragging = true;
        this.arr.push(new Vector2(0, 0));
        this.bspline = new Bspline(this.arr);
        this.nurbs = new Nurbs(this.arr);
        this.add_points();
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== METHODS
    points_count() { return this.arr.size(); }
    update_weights(index, weight) {
        this.nurbs.weights[index] = weight;
        this.nurbs.evaluate_draw_points();
    }
    on_mouse_down(position) {
        for (let i = 0; i < this.arr.size(); i++) {
            if (this.arr[i].collides(position)) {
                this.from = position;
                this.selected = this.arr[i];
                this.selected_id = Number(i);
                return true;
            }
        }
        return false;
    }
    on_mouse_up(position) {
        position; //empty statement to let it compile
        this.selected = null;
        return false;
    }
    on_mouse_moved(position) {
        if (this.selected !== null) {
            const delta = Vector2.sub(position, this.from);
            this.selected.move(delta); //simple control point dragging
            const to_be_updated = this.get_bezier_from_cp(this.selected_id);
            if (this.glued_dragging
                && this.selected_id !== 0
                && this.selected_id !== 1
                && this.selected_id !== this.arr.size() - 1
                && this.selected_id !== this.arr.size() - 2) //control points are glued 
             {
                if (this.is_shared(this.selected_id)) { //shared point being dragged
                    this.arr[this.selected_id + 1].move(delta);
                    this.arr[this.selected_id - 1].move(delta);
                }
                else {
                    let pivot;
                    let other_id;
                    if (this.selected_id % 3 === 2) {
                        other_id = this.selected_id + 2;
                        pivot = this.arr[this.selected_id + 1];
                    }
                    else {
                        other_id = this.selected_id - 2;
                        pivot = this.arr[this.selected_id - 1];
                    }
                    const other = this.arr[other_id];
                    other.set_position(Vector2.sum(pivot, Vector2.sub(pivot, this.selected)));
                    to_be_updated.push(this.beziers[Math.floor(other_id / 3)]);
                }
            }
            this.from = position;
            //update beziers
            to_be_updated.forEach(function (element) { element.evaluate_draw_points(); });
            //update others
            this.bspline.evaluate_draw_points();
            this.nurbs.evaluate_draw_points();
            return true;
        }
        else {
            return false;
        }
    }
    is_shared(cp_index) { return cp_index % 3 === 0; }
    get_bezier_from_cp(cp_index) {
        const ret = [];
        const bez_index = Math.floor(cp_index / 3);
        if (cp_index === (this.arr.size() - 1)) //last point
         {
            ret.push(this.beziers[bez_index - 1]);
            return ret;
        }
        //add current curve
        ret.push(this.beziers[bez_index]);
        if (cp_index !== 0 && this.is_shared(cp_index)) //last point of a curve
         { //add the previous one
            ret.push(this.beziers[bez_index - 1]);
        }
        return ret;
    }
    add_points() {
        this.arr.push(new Vector2(50, 50));
        this.arr.push(new Vector2(100, 50));
        this.arr.push(new Vector2(100, 100));
        //update beziers
        const bez = new Bezier(this.arr, this.arr.size() - 4);
        bez.set_style(new Draw_style(new Color(0, 255, 255, 1.0), Stroke.continuous()));
        this.beziers.push(bez);
        //update bspline and nurbs
        this.bspline = new Bspline(this.arr);
        this.bspline.set_style(new Draw_style(new Color(255, 150, 0, 1)));
        this.nurbs = new Nurbs(this.arr);
        this.nurbs.set_style(new Draw_style(new Color(100, 255, 0, 1)));
        /*this.bspline.resize();
        this.nurbs.resize();*/
        this.bspline.evaluate_draw_points();
        this.nurbs.evaluate_draw_points();
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== DRAW
    draw(ctx) {
        const ls = new Line_strip(this.arr);
        ls.set_style(new Draw_style(new Color(100, 100, 100, 0.75), Stroke.dotted()));
        ls.draw(ctx);
        this.beziers.forEach(function (element) { element.draw(ctx); });
        this.bspline.draw(ctx);
        this.nurbs.draw(ctx);
        /*
        //TMP BEG A
        ctx.setLineDash([5]);
        ctx.strokeStyle = new Color(100, 100, 100, 1.0).apply();
        ctx.beginPath();
        ctx.moveTo(this.arr[0].x, this.arr[0].y);
        ctx.quadraticCurveTo(this.arr[1].x, this.arr[1].y, this.arr[2].x, this.arr[2].y);
        ctx.stroke();
        //TMP END
        //TMP BEG B
        ctx.beginPath();
        ctx.moveTo(this.arr[1].x, this.arr[1].y);
        ctx.quadraticCurveTo(this.arr[2].x, this.arr[2].y, this.arr[3].x, this.arr[3].y);
        ctx.stroke();
        //TMP END
        //TMP BEG FULL
        ctx.setLineDash([]);
        ctx.strokeStyle = new Color(0, 255, 255, 1.0).apply();
        //TMP END*/
    }
    draw_points(ctx) {
        new Bezier(this.arr).draw_points(ctx);
    }
}
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== PROPERTIES
Lines_manager.size = 2;
//# sourceMappingURL=Lines_manager.js.map