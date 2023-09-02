import { Beat, BinauralBeat } from "../vite-env";

const binauralBeat: BinauralBeat = {
  beat: null,
  context: null,
  leftOscillator: null,
  rightOscillator: null,
  gainNode: null,

  init: function (beat: Beat) {
    //initialize context
    this.beat = beat;
    this.context = new AudioContext();
    const hdf = this.beat.desiredFrequency / 2;

    //initialize nodes
    this.leftOscillator = new OscillatorNode(this.context, {
      type: "sine",
      frequency: this.beat.baseFrequency - hdf,
    });
    this.rightOscillator = new OscillatorNode(this.context, {
      type: "sine",
      frequency: this.beat.baseFrequency + hdf,
    });
    this.gainNode = new GainNode(this.context, { gain: 1 });

    //connect nodes
    this.leftOscillator.connect(this.gainNode);
    this.rightOscillator.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);

    //play the beat
    this.rightOscillator.start();
    this.leftOscillator.start();

    //stop playing when the beat duration has elapsed
    this.leftOscillator.stop(this.context.currentTime + beat.duration);
    this.rightOscillator.stop(this.context.currentTime + beat.duration);

    this.context.onstatechange = () => console.log(this.context?.state, this.beat);
  },

  start() {
    this.rightOscillator?.start();
    this.leftOscillator?.start();
  },

  async play() {
    try {
      await this.context?.resume();
    } catch (err) {
      console.log(err);
    }
  },

  async pause() {
    try {
      await this.context?.suspend();
    } catch (err) {
      console.log(err);
    }
  },

  async close() {
    try {
      await this.context?.suspend();
    } catch (err) {
      console.log(err);
    }
  },
};

export default binauralBeat;
