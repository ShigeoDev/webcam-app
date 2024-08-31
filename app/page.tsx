'use client'

import WebcamVideo from './components/webcam'

export default function Home() {
  return (
    <div className='w-screen h-screen'>
      <div className='absolute w-[200px]'>
        <WebcamVideo />
      </div>
    </div>
  )
}
