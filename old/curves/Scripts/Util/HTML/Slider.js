//import "Assert.js";//TODO make work
function assert(condition, message) { if (!condition) {
    throw new Error(message || "Assertion failed");
} }
export class Slider {
    constructor() {
        this._min = 0;
        this._max = 100;
        this._val = 50;
        this._step = 1;
        this._id = "";
        this._show_value = null;
        this._has_show_value = false;
        this._label = null;
        this._has_label = "";
        this._event = null;
        //debug
        this.generated = false;
        this._html_slider = document.createElement("input");
        this._html_slider.className = "slider";
        this._html = document.createElement("div");
        this._html.className = "slidecontainer";
    }
    id(id) { this._id = id; return this; }
    range(min = 0, max = 100, val = 50, step = 1) {
        this._min = min;
        this._max = max;
        this._val = val;
        this._step = step;
        return this;
    }
    show_value() { this._has_show_value = true; return this; }
    label(label) { this._has_label = label; return this; }
    event(fn) { this._event = fn; return this; }
    generate() {
        this.generated = true;
        //label
        if (this._has_label.length !== 0) {
            this._label = document.createElement("label");
            this._label.innerHTML = this._has_label;
            this._html.appendChild(this._label);
        }
        //slider
        this._html_slider.type = "range";
        this._html_slider.min = this._min.toString();
        this._html_slider.max = this._max.toString();
        this._html_slider.value = this._val.toString();
        this._html_slider.step = this._step.toString();
        if (this._id.length !== 0) {
            this._html_slider.id = this._id;
        }
        this._html.appendChild(this._html_slider);
        //value
        if (this._has_show_value) {
            this._show_value = document.createElement("output");
            this._show_value.className = "bubble";
            this._html.appendChild(this._show_value);
            if (true) {
                this._show_value.innerHTML = this._html_slider.value;
                const val = Number(this._html_slider.value);
                const newVal = Number(((val - this._min) * 100) / (this._max - this._min));
                this._show_value.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
            }
            //event with show number
            if (this._event) {
                this._html_slider.oninput = (e) => {
                    this._show_value.innerHTML = this._html_slider.value;
                    const val = Number(this._html_slider.value);
                    const newVal = Number(((val - this._min) * 100) / (this._max - this._min));
                    this._show_value.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
                    this._event(e); //event call
                };
            }
            else //normal show number
             {
                this._html_slider.oninput = (e) => {
                    this._show_value.innerHTML = this._html_slider.value;
                    const val = Number(this._html_slider.value);
                    const newVal = Number(((val - this._min) * 100) / (this._max - this._min));
                    this._show_value.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
                };
            }
        }
        else {
            //event without show number
            if (this._event) {
                this._html_slider.oninput = this._event;
            }
        }
        return this;
    }
    append(div) {
        assert(this.generated, "Append called without calling generate().");
        div.appendChild(this._html);
    }
}
//# sourceMappingURL=Slider.js.map