import { Lines_manager } from "./Lines_manager.js";
import { Vector2 } from "./Vector2.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const checkbox_show_points = document.getElementById("checkbox_show_points");
const button_add_points = document.getElementById("button_add_points");
canvas.oncontextmenu = function (e) { e.preventDefault(); };
const lm = new Lines_manager();
export function get() { return { ctx: ctx, lm: lm }; }
let draw_points = false;
function mouse_position(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return new Vector2(event.clientX - rect.left, event.clientY - rect.top);
}
function on_mouse_down(event) {
    lm.on_mouse_down(mouse_position(canvas, event));
}
function on_mouse_up(event) { lm.on_mouse_up(mouse_position(canvas, event)); }
function on_mouse_moved(event) {
    if (lm.on_mouse_moved(mouse_position(canvas, event))) {
        draw(ctx);
    }
}
canvas.addEventListener("mousedown", on_mouse_down);
canvas.addEventListener("mouseup", on_mouse_up);
canvas.addEventListener("mousemove", on_mouse_moved);
checkbox_show_points.addEventListener("change", event => {
    const tmp = event.target;
    draw_points = tmp.checked;
    draw(ctx);
});
button_add_points.addEventListener("click", function () {
    lm.add_points();
    draw(ctx);
    update_sliders();
});
export function draw(ctx) {
    clear(ctx);
    lm.draw(ctx);
    if (draw_points) {
        lm.draw_points(ctx);
    }
}
function clear(ctx) {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
draw(ctx);
import { Slider } from "./Util/HTML/Slider.js";
const sliders_div = document.body.appendChild(document.createElement("div"));
function update_sliders() {
    while (sliders_div.hasChildNodes()) {
        sliders_div.removeChild(sliders_div.children[0]);
    }
    for (let i = 0; i < lm.points_count(); i++) {
        new Slider()
            .id("W" + i)
            .range(0, 40, 1, 0.5)
            .label("P" + i)
            .show_value()
            .event((e) => {
            lm.update_weights(i, Number(e.target.value));
            draw(ctx);
        })
            .generate().append(sliders_div);
    }
}
update_sliders();
//# sourceMappingURL=main.js.map