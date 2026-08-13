import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      autoToggle: true,
      allowNestedScroll: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
