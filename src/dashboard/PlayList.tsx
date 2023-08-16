import binauralBeats from "../lib/binauralBeats"
export default function PlayList() {
  const handler = () => {
    //create context
    const ctx = new AudioContext();
    //set frequency and duration
    let left = 200
    let right = 205
    let duration = 3
    binauralBeats.init(ctx, left, right, duration);
  }

  return (
    <>
      <button onClick={handler}>play</button>
    </>
  )
}
