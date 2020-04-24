import { Draw_style } from "./Util/HTML/Draw_style.js";
import { init } from "./Util/Array.js";
init();
export class Line_strip {
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== CONSTRUCTOR
    constructor(arr) {
        // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== PROPERTIES
        this.arr = [];
        this.draw_style = new Draw_style();
        if (arr !== undefined) {
            this.arr = arr;
        }
    }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== METHODS
    push(p) { return this.arr.push(p); }
    size() { return this.arr.size(); }
    clear() { this.arr = []; }
    // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== DRAW
    set_style(draw_style) { this.draw_style = draw_style; }
    draw(ctx) {
        this.draw_style.apply(ctx);
        this.draw_raw(ctx);
    }
    draw_raw(ctx) {
        if (!this.arr.empty()) {
            ctx.beginPath();
            ctx.moveTo(this.arr[0].x, this.arr[0].y);
            for (let i = 1; i < this.arr.size(); i++) {
                ctx.lineTo(this.arr[i].x, this.arr[i].y);
            }
            ctx.stroke();
        }
    }
    draw_points(ctx) {
        this.arr.forEach(function (element) { element.draw(ctx); });
    }
}
//# sourceMappingURL=Line_strip.js.map