import * as Form from '@radix-ui/react-form'
import { ChangeEventHandler, useState } from "react"
import { useAppDispatch } from "../store/hooks"
import { addBeat, updateBeat } from '@/store/playListSlice';
import { Beat } from '@/vite-env';
import Input from './Input';
import { v4 as uuid } from 'uuid';

export default function ModalForm({ setShowModal, editBeat }: any) {
  /* new beat form */

  //variable declarations
  const dispatch = useAppDispatch();
  const id = editBeat?.id || uuid();
  const [title, setTitle] = useState(editBeat?.title || '');
  const [baseFrequency, setBaseFrequency] = useState(editBeat?.baseFrequency || 0);
  const [desiredFrequency, setDesiredFrequency] = useState(editBeat?.desiredFrequency || 0);
  const [duration, setDuration] = useState(editBeat?.duration || 0);

  //handle onChange event
  const handleChange: ChangeEventHandler = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;

    switch (id) {
      case ("title"):
        setTitle(value);
        break;
      case ("duration"):
        setDuration(value);
        break
      case ("baseFrequency"):
        setBaseFrequency(value);
        break;
      case ("desiredFrequency"):
        setDesiredFrequency(value);
        break;
      default:
        throw Error("Specified input Id doesn't exist")
    }
  }

  //create new beat
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //dispatch event to store
    const payLoad: Beat = { id, title, baseFrequency, desiredFrequency, duration };
    if (editBeat) dispatch(updateBeat(payLoad))
    else dispatch(addBeat(payLoad));
    //close modal
    setShowModal(false);
    //reset input fields
    setTitle('');
    setBaseFrequency(0);
    setDesiredFrequency(0);
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

      <Form.Field name="baseFrequency" className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <Form.Label className='font-montserrat'>*Base Frequency</Form.Label>
          <Form.Message match="valueMissing" className="text-xs text-error">Fill in the frequency in hz</Form.Message>
        </div>
        <Form.Control asChild>
          <Input
            id="baseFrequency"
            type="number"
            value={baseFrequency}
            onChange={handleChange}
            min={1}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field name="desiredFrequency" className="flex flex-col">
        <div className="flex items-baseline justify-between">
          <Form.Label className='font-montserrat'>*Desired Frequency</Form.Label>
          <Form.Message match="valueMissing" className="text-xs text-error">Fill in the frequency in hz</Form.Message>
        </div>
        <Form.Control asChild>
          <Input
            id="desiredFrequency"
            type="number"
            value={desiredFrequency}
            onChange={handleChange}
            min={1}
          />
        </Form.Control>
      </Form.Field>

        <Form.Submit className="btn btn-primary max-w-fit self-end"> {editBeat ? "Update" : "Create"} </Form.Submit>

      </Form.Root>
    </main>
  )
}
