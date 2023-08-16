import {
  PlayIcon,
  PauseIcon,
  TrackNextIcon,
  TrackPreviousIcon
} from "@radix-ui/react-icons"
import * as Progress from '@radix-ui/react-progress';
import { useState } from "react"

export default function Player({ctx}: {ctx: AudioContext}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(10);

  function showProgress() {
    console.log(progress)
    if (isPlaying !== false) return;

    if (progress >= 100) {
      setIsPlaying(false)
      return;
    }

    setProgress(p => p + 1);
  }

  const playOrPause = () => {
    setIsPlaying(p => !p)
    const playBack = setInterval(showProgress, 100);
    if(!isPlaying || progress >= 100) {
      clearInterval(playBack);
    }
  }

  return (
    <div className="fixed bottom-0 flex flex-col">
      <Progress.Root value={ctx.currentTime} className="w-screen h-2">
        <Progress.Indicator
          className="bg-white w-full h-full"
        />
      </Progress.Root>
      <div className="flex justify-center w-screen bg-base-300">
        <button className="btn btn-xs rounded-sm">
          <TrackPreviousIcon />
        </button>
        <button onClick={playOrPause} className="btn btn-xs rounded-sm">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="btn btn-xs rounded-sm">
          <TrackNextIcon />
        </button>
      </div>
    </div>
  )
}
