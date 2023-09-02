/// <reference types="vite/client" />

import { ChangeEventHandler, HTMLInputTypeAttribute, MutableRefObject } from "react";

//custom input properties
type InputProps = InputHTMLAttributes<HTMLInputElement>;

//beats generator object properties
interface BinauralBeats {
  volume(context: AudioContext, leftOscillators: OscillatorNode, rightOscillator: OscillatorNode) : void;
  frequency(context: AudioContext, leftOscillators: OscillatorNode, rightOscillator: OscillatorNode, left: number, right: number) : void;
  start(leftOscillators: OscillatorNode, rightOscillator: OscillatorNode) : void;
  pause(leftOscillators: OscillatorNode, rightOscillator: OscillatorNode) : void;
  init(context: AudioContext,left: number, right: number) : void;
}

//individual beat properties
interface Beat {
  id: string;
  title: string;
  baseFrequency: number;
  desiredFrequency: number;
  duration: number;
}

//react ref type for buttons
type refType = MutableRefObject<null|HTMLButtonElement>

//currently selected beat
type currentBeat = Beat | null;
