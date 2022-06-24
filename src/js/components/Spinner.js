import { createDivEl } from "../utils";

let instance = null;

class Spinner {
    constructor() {
        if (instance) {
            return instance;
        }
        this.element = this._createSpinner();
        instance = this;
    }

    _createSpinner() {
        const item = createDivEl({ className: "esrc-spinner" });
        const bubble = createDivEl({ className: "esrc-spinner-bubble" });
        item.appendChild(bubble);
        return item;
    }

    static start(target) {
        const spinnerEl = Spinner.getInstance().element;
        if (!target.contains(spinnerEl)) {
            target.appendChild(spinnerEl);
        }
    }

    static remove() {
        const spinnerEl = Spinner.getInstance().element;
        const targetEl = spinnerEl.parentElement;
        if (targetEl && targetEl.contains(spinnerEl)) {
            spinnerEl.parentElement.removeChild(spinnerEl);
        }
    }

    static getInstance() {
        return new Spinner();
    }
}

export { Spinner };