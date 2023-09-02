import Playlist from "./PlayList";
import Create from "./Create";
import Player from "./Player";
import { useAppSelector } from "@/store/hooks";

export default function Dashboard() {
  //get the details of the current beat
  const beat = useAppSelector(state => state.currentBeat);

  return (
    <main>
      <Create />
      <Playlist />
      <Player beat={beat} />
    </main>
  )
}
