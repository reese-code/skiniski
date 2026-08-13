import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Home() {
  const boxRef = useRef(null)

  useEffect(() => {
    gsap.from(boxRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power2.out',
    })
  }, [])

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        ref={boxRef}
        className="rounded-xl bg-white px-10 py-8 shadow-lg text-center"
      >
        <h1 className="text-3xl font-semibold text-gray-900">skiniski</h1>
        <p className="mt-2 text-gray-500">Vite + React + Tailwind + GSAP</p>
      </div>

      <section id="services" />
    </div>
  )
}

export default Home
