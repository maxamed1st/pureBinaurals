/// <reference types="vite/client" />

import { ChangeEventHandler, HTMLInputTypeAttribute, MutableRefObject } from "react";

//custom input properties
type InputProps = InputHTMLAttributes<HTMLInputElement>;

//beats generator object properties
interface BinauralBeat {
  beat: Beat | null;
  context: AudioContext | null;
  leftOscillator: OscillatorNode | null;
  rightOscillator: OscillatorNode | null;
  gainNode: GainNode | null;

  init: (beat: Beat) => void;
  start: () => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  close: () => Promise<void>;
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
type refType = MutableRefObject<null | HTMLButtonElement>

//currently selected beat
type currentBeat = Beat | null;
