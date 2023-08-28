import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'

export default function Modal({ title, MainContent, showModal, setShowModal, editBeat }: any) {
  return (
    <Dialog.Root open={showModal}>
      <Dialog.Portal>

        <Dialog.Overlay className='fixed inset-0 bg-black/50' />

        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 w-1/3 -translate-y-1/2 
          bg-base-100 px-5 py-3 rounded-lg flex flex-col gap-5'>

          <header className='flex justify-between'>
            <Dialog.Title className="font-montserrat font-medium text-lg"> {title} </Dialog.Title>
            <Dialog.Close onClick={() => setShowModal(false)} className="hover:text-base-content/60">
              <Cross1Icon />
            </Dialog.Close>
          </header>

          <MainContent setShowModal={ setShowModal } editBeat={ editBeat } />

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
