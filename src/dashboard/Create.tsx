import { PlusIcon } from "@radix-ui/react-icons"
import * as Form from '@radix-ui/react-form'
import { ChangeEventHandler, useState } from "react"
import { Beat, refType } from "../vite-env"
import { addBeat } from "../store/playListSlice"
import { useAppDispatch } from "../store/hooks"
import Modal from "../Components/Modal"
import Input from "../Components/Input"

export default function Create() {
  /* create new beat */

  //Auto create beats for development
  const dispatch = useAppDispatch();
  function devEnv() {
    const payload_1: Beat = { id: 0, title: "first sound", frequency: 30, duration: 105671 };
    const payload_2: Beat = { id: 1, title: "rain of the fire", frequency: 19, duration: 2250 };
    dispatch(addBeat(payload_1));
    dispatch(addBeat(payload_2));
  }
  devEnv();

  return <Modal title="Create Binaural Beat" Trigger={PlusIcon} MainContent={ModalForm} />
}

function ModalForm({ closeModalRef }: { closeModalRef: refType }) {
  /* new beat form */

  //variable declarations
  const dispatch = useAppDispatch();
  const [id, setId] = useState(1);
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [duration, setDuration] = useState(0);

  //handle onChange event
  const handleChange: ChangeEventHandler = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case ("title"):
        setTitle(value);
        break;
      case ("frequency"):
        setFrequency(value);
        break;
      case ("duration"):
        setDuration(value);
        break
      default:
        throw Error("Specified input Id doesn't exist")
    }
  }

  //create new beat
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //dispatch event to store
    const payLoad: Beat = { id, title, frequency, duration };
    dispatch(addBeat(payLoad));
    //increment id to avoid id collisions
    setId(prev => prev + 1);
    //close modal
    closeModalRef.current?.click();
    //reset input fields
    setTitle('');
    setFrequency(0);
    setDuration(0);
  }

  return (
    <main>
      <Form.Root onSubmit={handleSubmit} className="flex flex-col gap-4">

        <Form.Field name="title" className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <Form.Label className='font-montserrat'>*Title</Form.Label>
            <Form.Message match="valueMissing" className="text-xs text-error">Fill in the title for this beat</Form.Message>
          </div>
          <Form.Control asChild>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={handleChange}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="frequency" className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <Form.Label className='font-montserrat'>*Frequency</Form.Label>
            <Form.Message match="valueMissing" className="text-xs text-error">Fill in the frequency in hz</Form.Message>
          </div>
          <Form.Control asChild>
            <Input
              id="frequency"
              type="number"
              value={frequency}
              onChange={handleChange}
              min={1}
            />
          </Form.Control>
        </Form.Field>

        <Form.Field name="duration" className="flex flex-col">
          <div className="flex items-baseline justify-between">
            <Form.Label className='font-montserrat'>*Duration</Form.Label>
            <Form.Message match="valueMissing" className="text-xs text-error"> Fill in the duration in seconds </Form.Message>
          </div>
          <Form.Control asChild>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={handleChange}
              min={1}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit className="btn btn-primary max-w-fit self-end"> Create </Form.Submit>

      </Form.Root>
    </main>
  )
}
