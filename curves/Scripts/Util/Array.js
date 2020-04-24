export function init() {
    if (!Array.prototype.resize) {
        Array.prototype.resize = function (size, fill) {
            if (fill === undefined || size <= this.size()) {
                this.length = size;
            }
            else {
                for (let i = this.size(); i < size; i++) {
                    this[i] = fill;
                }
            }
            return this;
        };
    }
    if (!Array.prototype.at) {
        Array.prototype.at = function (index) {
            if (index < 0 || index >= this.size()) {
                throw "Index out of array bounds exception.";
            }
            return this[index];
        };
    }
    if (!Array.prototype.size) {
        Array.prototype.size = function () { return this.length; };
    }
    if (!Array.prototype.empty) {
        Array.prototype.empty = function () { return this.size() === 0; };
    }
}
//# sourceMappingURL=Array.js.map