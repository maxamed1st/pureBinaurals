/// <reference types="vite/client" />

//beats generator object properties
interface BinauralBeats {
  volume(context: AudioContext, leftOscillators: OscillatorNode, rightOscillator: OscillatorNode) : void;
  frequency(context: AudioContext, leftOscillators: OscillatorNode, rightOscillator: OscillatorNode, left: number, right: number) : void;
  play(context: AudioContext, leftOscillators: OscillatorNode, rightOscillator: OscillatorNode, time: number) : void;
  init(context: AudioContext,left: number, right: number, time: number) : void;
}

//individual beat properties
interface Beat {
  id: number;
  title: string;
  frequency: number;
  duration: number;
}