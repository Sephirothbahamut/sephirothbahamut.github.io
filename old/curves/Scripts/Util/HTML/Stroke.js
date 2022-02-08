export class Stroke {
    constructor(stroke) {
        this.stroke = [];
        this.stroke = stroke;
    }
    static dotted() { return new Stroke([2]); }
    static lines() { return new Stroke([5]); }
    static continuous() { return new Stroke([]); }
    apply(ctx) { ctx.setLineDash(this.stroke); }
}
//# sourceMappingURL=Stroke.js.map