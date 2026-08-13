import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BRAND_TEXT = 'Skin is Ki'
const BODY_TEXT =
  ' is founded by Kiana Smith, who is a licensed esthetician who practices esthetics, and her services are waxing, facials, and massages, and other dermatologist recommendations.'

function splitToChars(text, keyPrefix) {
  return text.split('').map((char, i) => (
    <span key={`${keyPrefix}-${i}`} className="about-char">
      {char}
    </span>
  ))
}

function AnimatedAboutText() {
  const textRef = useRef(null)

  useEffect(() => {
    const chars = textRef.current.querySelectorAll('.about-char')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0.5 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.02,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      )
    }, textRef)

    return () => ctx.revert()
  }, [])

  return (
    <p ref={textRef} className="font-normal text-h2">
      <span className="ml-20 font-editorial text-h2 uppercase">
        {splitToChars(BRAND_TEXT, 'brand')}
      </span>
      {splitToChars(BODY_TEXT, 'body')}
    </p>
  )
}

export default AnimatedAboutText
