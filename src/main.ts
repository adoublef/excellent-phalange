import "./style.css";
import { attr, consume, controller, mainSlot, providable, provide, slot, slottable, target } from "./catalyst";

/* global context, we only allowed one anyway */
// const baseContext = new AudioContext();


@controller
@providable
export class AudioSampleElement extends HTMLElement {
    @attr
    src = "";

    @consume
    baseContext: AudioContext;

    buffer: AudioBuffer | null;

    // _gainNode: GainNode;

    async connectedCallback() {
        const res = await fetch(this.src);
        const arrayBuffer = await res.arrayBuffer();
        this.buffer = await this.baseContext.decodeAudioData(arrayBuffer);

        // this._gainNode = this.baseContext.createGain();
    }

    handleEvent() {
        const { buffer, baseContext } = this;
        const sample = new AudioBufferSourceNode(baseContext, { buffer });
        sample.connect(baseContext.destination);
        sample.start(baseContext.currentTime);


        // sample.connect(this._gainNode);
        // this._gainNode.connect(baseContext.destination);
        // sample.start(baseContext.currentTime);
    }
}

@controller
@providable
export class EffectPluginElement extends HTMLElement {
    @attr
    min = 0;

    @attr
    max = 100;

    @attr
    step = 1;

    @attr
    value = 80;

    @target
    declare controls: HTMLInputElement;

    @target
    declare display: HTMLOutputElement;

    connectedCallback() {
        this.controls.min = this.min.toString();
        this.controls.max = this.max.toString();
        this.controls.step = this.step.toString();
        this.controls.value = this.value.toString();
        this.display.textContent = this.valueAsPercentage;
    }

    handleEvent() {
        this.value = this.controls.valueAsNumber;
        this.display.textContent = this.valueAsPercentage;

        // let gainNode = new AudioContext().createGain()

        // gainNode.disconnect()
    }

    get valueAsPercentage() {
        return (this.controls.valueAsNumber * 100).toFixed(0).padStart(3, "0");
    }
}


@controller
@providable
@slottable
export class AudioMixerElement extends HTMLElement {
    @provide
    baseContext = new AudioContext();

    @slot
    plugin: HTMLSlotElement;

    connectedCallback() {
        console.log(this.plugin.assignedNodes());
    }
}