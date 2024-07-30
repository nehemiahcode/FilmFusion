import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

function Spinner() {
    return (
        <div className='flex flex-col items-center justify-center  bg-transparent h-screen w-full dark:text-white text-black'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <span className='animate-spin'><ImSpinner2 size={30} /></span>
                <p>Please wait.....</p>
        </div></div>
    )
}

export default Spinner
