import { Draw_style } from "./Util/HTML/Draw_style.js";
import { Color } from "./Util/HTML/Draw_style.js";
import { dist } from "./Util/Math.js";
import { dist2 } from "./Util/Math.js";
export class Vector2 {
    constructor(x, y) { this.x = x; this.y = y; }
    static distance2(a, b) { return dist2(a.x, a.y, b.x, b.y); }
    static distance(a, b) { return dist(a.x, a.y, b.x, b.y); }
    set_position(position) { this.x = position.x; this.y = position.y; }
    move(delta) { this.x += delta.x; this.y += delta.y; }
    collides(oth) { return Vector2.distance2(this, oth) < (Vector2.size * Vector2.size); }
    draw(ctx) {
        Vector2.draw_style.apply(ctx);
        this.draw_raw(ctx);
    }
    draw_raw(ctx) {
        ctx.strokeRect(this.x - Vector2.size, this.y - Vector2.size, Vector2.size * 2, Vector2.size * 2);
    }
    toString() { return "(" + this.x + ", " + this.y + ")"; }
}
Vector2.draw_style = new Draw_style(new Color(255, 0, 0, 1.0));
Vector2.size = 6;
Vector2.sum = function (a, b) { return new Vector2(a.x + b.x, a.y + b.y); };
Vector2.sub = function (a, b) { return new Vector2(a.x - b.x, a.y - b.y); };
//# sourceMappingURL=Vector2.js.map