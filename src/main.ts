import "./style.css";
import { attr, consume, controller, providable, provide, target } from "./catalyst";

/* global context, we only allowed one anyway */
// const baseContext = new AudioContext();

@controller
@providable
export class AudioMixerElement extends HTMLElement {
    @provide
    baseContext = new AudioContext();
}

@controller
@providable
export class AudioSampleElement extends HTMLElement {
    @attr
    src = "";

    @consume
    baseContext: AudioContext

    buffer: AudioBuffer | null;

    async connectedCallback() {
        const res = await fetch(this.src);
        const arrayBuffer = await res.arrayBuffer();
        this.buffer = await this.baseContext.decodeAudioData(arrayBuffer);
    }

    handleEvent() {
        const { buffer, baseContext } = this;
        const sample = new AudioBufferSourceNode(baseContext, { buffer });
        sample.connect(baseContext.destination);
        sample.start(baseContext.currentTime);
    }
}

@controller
@providable
export class EffectPluginElement extends HTMLElement { }

