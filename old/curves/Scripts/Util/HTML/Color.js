export class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        if (a !== undefined) {
            this.a = a;
        }
        else {
            this.a = 1;
        }
    }
    static black() { return new Color(0, 0, 0); }
    static white() { return new Color(255, 255, 255); }
    static red() { return new Color(255, 0, 0); }
    static green() { return new Color(0, 255, 0); }
    static blue() { return new Color(0, 0, 255); }
    static yellow() { return new Color(255, 255, 0); }
    static cyan() { return new Color(0, 255, 255); }
    static magenta() { return new Color(255, 0, 255); }
    static transparent() { return new Color(0, 0, 0, 0); }
    toString() { return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"; }
    apply(ctx) { ctx.strokeStyle = this.toString(); }
}
//# sourceMappingURL=Color.js.map