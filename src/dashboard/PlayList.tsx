import { PlayIcon, DotsHorizontalIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/Components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { deleteBeat } from "@/store/playListSlice";
import Modal from "@/Components/Modal";
import ModalForm from "@/Components/Form";
import { useState } from "react";

export default function PlayList() {
  const beats = useAppSelector(state => state.playList)
  
  //edit a beat
  const [showModal, setShowModal] = useState(false);
  const [editBeat, setEditBeat] = useState(null);

  function updateBeat(e: any) {
    setShowModal(true);
    const id = e.target.getAttribute('data-beat-id');
    const currentBeat: any = beats.filter((b: any) => b.id == id);
    setEditBeat(() => currentBeat[0])
  }

  return (
    <section className="p-5">
      {!beats && "click on the create button to get started with your first binaural beat"}
      {beats && beats.map((beat) => <RenderBeat beat={beat} key={beat.id} updateBeat={updateBeat} showModal={showModal} setShowModal={setShowModal} editBeat={editBeat} />)}
    </section>
  )
}

function RenderBeat({beat, updateBeat, showModal, setShowModal, editBeat}: any) {
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
                <Pencil1Icon className="pr-2"/>
                <button data-beat-id={beat.id} onClick={updateBeat}> Edit </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Cross1Icon className="pr-2 text-error"/>
                <button data-beat-id={beat.id} onClick={removeBeat}> Delete </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Modal title={"Edit Beat"} MainContent={ModalForm} showModal={showModal} setShowModal={setShowModal} editBeat={editBeat}/>

        </div>
      </div>
    </section>
  )
}
