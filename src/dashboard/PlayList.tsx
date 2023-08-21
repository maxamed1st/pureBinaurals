import { useAppSelector } from "../store/hooks";
import { Beat } from "../vite-env";
import { PlayIcon } from "@radix-ui/react-icons";

export default function PlayList() {
  const beats = useAppSelector(state => state.playList)

  return (
    <section className="p-5">
      {!beats && "click on the create button to get started with your first binaural beat"}
      {beats && beats.map((beat) => <RenderBeat beat={beat} key={beat.id} />)}
    </section>
  )
}

function RenderBeat({beat}: {beat: Beat}) {
  //convert seconds to time format
  function secondsToHHMMSS(sec: number) {
    let hh: any = Math.floor(sec / 3600).toString().padStart(2, "0");
    let mm: any = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    let ss: any = (sec % 60).toString().padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }

  //format beat frequency and duration
  const frequency = beat.frequency.toString().padStart(2, "0");
  const duration = secondsToHHMMSS(beat.duration);

  return (
    <section key={beat.id} className="flex bg-base-200 m-1 rounded-lg font-montserrat">
      <div className="flex gap-2 mr-auto p-2 content-baseline">
        <button className="btn btn-xs rounded-md">
          <PlayIcon />
        </button>
        {beat.title}
      </div>

      <div className="flex gap-2 p-2">
        <div className="tooltip" data-tip="frequency">
          {frequency} hz
        </div>

        {/* divide by vertical line */}
        <div className="border"></div>

        <div className="tooltip" data-tip="duration">
          {duration}
        </div>
      </div>
    </section>
  )
}
