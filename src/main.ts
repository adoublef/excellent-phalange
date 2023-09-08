import "./style.css";

import { attr, controller, target } from "./catalyst";

@controller
export class HelloWorldElement extends HTMLElement {
    @attr
    name = "World";

    @target
    declare display: HTMLSpanElement;

    connectedCallback() {
        this.display.textContent = this.name;
    }
}