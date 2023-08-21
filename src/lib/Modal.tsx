import * as Dialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useRef } from 'react';
import { refType } from '../vite-env';

export default function Modal({ Trigger, MainContent }: any) {
  //reference the close button
  //to give MainContent control over it
  const closeModalRef: refType = useRef(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Trigger />
      </Dialog.Trigger>
      <Dialog.Portal>

        <Dialog.Overlay className='fixed inset-0 bg-black/50' />

        <Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 w-1/3 -translate-y-1/2 
          bg-base-100 px-5 py-3 rounded-lg flex flex-col gap-5'>

          <header className='flex justify-between'>
            <Dialog.Title className="font-montserrat font-medium text-lg">Create Binaural Beats</Dialog.Title>
            <Dialog.Close ref={closeModalRef} className="hover:text-base-content/60">
              <Cross1Icon />
            </Dialog.Close>
          </header>

          <MainContent closeModalRef={closeModalRef} />

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
