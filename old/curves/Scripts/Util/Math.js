export function lerp(a, b, t) {
    return (1.0 - t) * a + t * b;
}
export function dist2(x1, y1, x2, y2) {
    const x = x1 - x2;
    const y = y1 - y2;
    return (x * x) + (y * y);
}
export function dist(x1, y1, x2, y2) {
    return Math.sqrt(dist2(x1, y1, x2, y2));
}
//# sourceMappingURL=Math.js.map