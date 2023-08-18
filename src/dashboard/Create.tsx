import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons"
import * as Modal from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import { ChangeEventHandler, MutableRefObject, useRef, useState } from "react"
import { Beat, inputProps } from "../vite-env"
import { addBeat } from "../store/playListSlice"
import { useAppDispatch } from "../store/hooks"

//custom input element
function Input({id, type, value, onChange, min }: inputProps) {
//Set Invalid color only after user leaves the input invalid
const [Blur, setBlur] = useState(false)
  return (
    <input
     id={id}
     type={type}
     value={value}
     onChange={onChange}
     min={min}
     className={`rounded outline-none border-2 
       ${ Blur ? "valid:border-success invalid:border-error" : "border-base-300"}`}
     onBlur={() => setBlur(true)}
     required
     />
  )
}

export default function Create() {
  /* create new beat */

  //variable declarations
  const dispatch = useAppDispatch();
  const closeModalRef: MutableRefObject<null|HTMLButtonElement> = useRef(null);
  const [id, setId] = useState(1);
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [duration, setDuration] = useState(0);

  //handle onChange event
  const handleChange:ChangeEventHandler = (e: any) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log(e.target.id, e.target.value);
    switch(id) {
      case("title"):
        setTitle(value);
        break;
      case("frequency"):
        setFrequency(value);
        break;
      case("duration"):
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
    const payLoad: Beat = {id, title, frequency, duration};
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
    <Modal.Root>
      <Modal.Trigger>
        <PlusIcon className="hover:text-base-content/60" />
      </Modal.Trigger>
      <Modal.Portal>

        <Modal.Overlay className='fixed inset-0 bg-black/50' />

        <Modal.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 w-1/3 -translate-y-1/2 
          bg-base-100 px-5 py-3 rounded-lg flex flex-col gap-5'>

          <header className='flex justify-between'>
            <Modal.Title className="font-montserrat font-medium text-lg">Create Binaural Beats</Modal.Title>
            <Modal.Close ref={closeModalRef} className="hover:text-base-content/60">
              <Cross1Icon />
            </Modal.Close>
          </header>

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
        </Modal.Content>
      </Modal.Portal>

    </Modal.Root>
  )
}
