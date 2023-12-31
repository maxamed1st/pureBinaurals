import { PlusIcon } from "@radix-ui/react-icons"
import { Beat } from "../vite-env"
import { addBeat } from "../store/playListSlice"
import { useAppDispatch } from "../store/hooks"
import Modal from "../Components/Modal"
import ModalForm from "@/Components/Form"
import { v4 as uuid } from 'uuid';
import { useState } from "react"

export default function Create() {
  /* create new beat */

  const [showModal, setShowModal] = useState(false);

  //Auto create beats for development
  const dispatch = useAppDispatch();
  function devEnv() {
    const id = () => uuid();
    const payload_1: Beat = { id: id(), title: "first sound", baseFrequency: 200, desiredFrequency: 30, duration: 105671 };
    const payload_2: Beat = { id: id(), title: "rain of the fire", baseFrequency: 440, desiredFrequency: 5, duration: 2250 };
    dispatch(addBeat(payload_1));
    dispatch(addBeat(payload_2));
  }
  devEnv();

  return (
    <>
      <button onClick={() => setShowModal(true)}> 
        <PlusIcon />
      </button>
      <Modal title="Create Binaural Beat" MainContent={ModalForm} showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
