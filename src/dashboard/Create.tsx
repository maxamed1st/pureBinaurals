import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons"
import * as Modal from '@radix-ui/react-dialog'
import * as Form from '@radix-ui/react-form'
import { useState } from "react"

function Input({ type, ...attributes }: React.InputHTMLAttributes<HTMLInputElement>) {
  //Set Invalid color only after user leaves the input invalid
  const [Blur, setBlur] = useState(false)

  return (
    <input
      type={type}
      className={`rounded outline-none border-2 
        ${ Blur ? "valid:border-success invalid:border-error" : "border-base-300"}`}
      onBlur={() => setBlur(true)}
      {...attributes}
    />
  )
}

export default function Create() {
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
            <Modal.Close className="hover:text-base-content/60">
              <Cross1Icon />
            </Modal.Close>
          </header>

          <main>
            <Form.Root className="flex flex-col gap-4">

              <Form.Field name="title" className="flex flex-col">
                <div className="flex items-baseline justify-between">
                <Form.Label className='font-montserrat'>*Title</Form.Label>
                <Form.Message match="valueMissing" className="text-xs text-error">Fill in the title for this beat</Form.Message>
                </div>
                <Form.Control asChild>
                  <Input type="text" required/>
                </Form.Control>
              </Form.Field>

              <Form.Field name="frequency" className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <Form.Label className='font-montserrat'>*Frequency</Form.Label>
                  <Form.Message match="valueMissing" className="text-xs text-error">Fill in the frequency in hz</Form.Message>
                </div>
                <Form.Control asChild>
                  <Input type="number" min={0} required/>
                </Form.Control>
              </Form.Field>

              <Form.Field name="duration" className="flex flex-col">
                <div className="flex items-baseline justify-between">
                  <Form.Label className='font-montserrat'>*Duration</Form.Label>
                  <Form.Message match="valueMissing" className="text-xs text-error"> Fill in the duration in seconds </Form.Message>
                </div>
                <Form.Control asChild>
                  <Input type="number" min={0} required/>
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
