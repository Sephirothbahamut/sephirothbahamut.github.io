import { Color } from "./Color.js";
import { Stroke } from "./Stroke.js";
export class Draw_style {
    constructor(color = Color.black(), stroke = Stroke.continuous()) {
        this.color = color;
        this.stroke = stroke;
    }
    apply(ctx) {
        this.color.apply(ctx);
        this.stroke.apply(ctx);
    }
}
export { Color };
export { Stroke };
//# sourceMappingURL=Draw_style.js.map