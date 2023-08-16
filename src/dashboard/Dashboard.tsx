import Playlist from "./PlayList"
import Create from "./Create";
import Player from "./Player"

export default function Dashboard() {
  //create context
  const ctx = new AudioContext();
  return (
    <main>
      <Create />
      <Playlist />
      <Player ctx={ctx} />
    </main>
  )
}
