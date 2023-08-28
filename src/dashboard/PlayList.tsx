import { useAppSelector } from "../store/hooks";
import { Beat } from "../vite-env";
import { PlayIcon, DotsHorizontalIcon, Cross1Icon } from "@radix-ui/react-icons";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/Components/ui/dropdown-menu";
import { useAppDispatch } from "../store/hooks"
import { deleteBeat } from "@/store/playListSlice";

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

  //delete a beat
  const dispatch = useAppDispatch()

  function removeBeat(e: any) {
    const id: string = e.target.getAttribute('data-beat-id');
    dispatch(deleteBeat(id))
  }

  return (
    <section key={beat.id} className="flex items-center bg-base-200 m-1 rounded-lg text-sm md:text-base lg:text-lg">
      <div className="flex items-center mr-auto py-2">
        <button className="btn btn-xs rounded-md">
          <PlayIcon className="max-sm:w-3 max-sm:h-3"/>
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
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-base-300 border-neutral">
              <DropdownMenuItem>
                <Cross1Icon className="pr-2 text-error"/>
                <button data-beat-id={beat.id} onClick={removeBeat}> Delete </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}
