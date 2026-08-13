import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function splitToChars(text, keyPrefix) {
  return text.split('').map((char, i) => (
    <span key={`${keyPrefix}-${i}`} className="about-char">
      {char}
    </span>
  ))
}

function AnimatedAboutText({ brandText, bodyText }) {
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
  }, [brandText, bodyText])

  return (
    <p ref={textRef} className="font-normal text-h2">
      <span className="ml-20 font-editorial text-h2 uppercase max-md:ml-5">
        {splitToChars(brandText, 'brand')}
      </span>
      {splitToChars(bodyText, 'body')}
    </p>
  )
}

export default AnimatedAboutText
