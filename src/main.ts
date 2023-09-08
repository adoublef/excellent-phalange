import "./style.css";
import { attr, controller, target } from "./catalyst";

/* global context, we only allowed one anyway */
const audioContext = new AudioContext();

@controller
export class AudioSampleElement extends HTMLElement {
    @attr
    src = "";

    buffer: AudioBuffer | null;

    async connectedCallback() {
        const res = await fetch(this.src);
        const arrayBuffer = await res.arrayBuffer();
        this.buffer = await audioContext.decodeAudioData(arrayBuffer);
    }

    handleEvent() {
        const { buffer } = this;
        const sample = new AudioBufferSourceNode(audioContext, { buffer });
        sample.connect(audioContext.destination);
        sample.start(audioContext.currentTime);
    }
}