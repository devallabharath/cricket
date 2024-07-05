const Modal = ({ title, hide, children }) => {
  return (
    <div className='h-dvh w-dvw p-1 flex justify-center items-start overflow-x-hidden bg-transparent backdrop-blur-sm overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
      <div className='relative my-16 w-3/5 max-sm:w-full min-w-md max-w-xl'>
        <div className='rounded-md shadow-lg relative flex flex-col items-center w-full bg-neutral-50 dark:bg-neutral-800'>
          <div className='w-full flex justify-between px-5 py-2 border-b border-solid light:border-gray-300 dark:border-neutral-600 rounded-t '>
            <h3 className='text-blue-500 text-xl font-bold'>{title}</h3>
            <button
              className='bg-transparent border-0 text-black float-right'
              onClick={hide}
            >
              <span className='text-white opacity-7 h-8 w-8 text-xl block bg-red-600 hover:bg-red-500 active:bg-red-600 py-0 rounded-full'>
                x
              </span>
            </button>
          </div>
          <div className='relative p-3 flex-auto'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
