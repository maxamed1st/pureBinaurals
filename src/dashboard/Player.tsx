import binauralBeat from "@/lib/binauralBeats";
import { Beat, BinauralBeat } from "@/vite-env";
import {
  PlayIcon,
  PauseIcon,
  TrackNextIcon,
  TrackPreviousIcon
} from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

export default function Player({ beat }: { beat: null | Beat }) {
  //initialize binauralBeats
  let beatGenerator: BinauralBeat | null;
  useEffect(() => {
    if (beat) {
      beatGenerator = binauralBeat;
      beatGenerator.init(beat);
    }
    return () => {
      //close audio context on unmount
      beatGenerator?.close();
    }
  }, [beat]);

  const play = async () => await beatGenerator?.play();
  const pause = async () => await beatGenerator?.pause();
  return (
    <div className="fixed bottom-0 flex flex-col">
      <div className="flex justify-center w-screen bg-base-300">
        <button className="btn btn-xs rounded-sm">
          <TrackPreviousIcon />
        </button>
        <TogglePlay play={play} pause={pause} />
        <button className="btn btn-xs rounded-sm">
          <TrackNextIcon />
        </button>
      </div>
    </div>
  )
}

function TogglePlay({ play, pause }: { play: CallableFunction, pause: CallableFunction }) {
  const [isPlaying, setIsPlaying] = useState(true)
  //play/pause based on state
  useEffect(() => {
    isPlaying ? play() : pause();
  })
  return (
    <button onClick={() => setIsPlaying(prev => !prev)} className="btn btn-xs rounded-sm">
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}
