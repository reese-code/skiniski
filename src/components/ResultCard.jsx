import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function ResultCard({ before, after, name, price, description }) {
  const imageRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleEnter = () => {
    setIsHovered(true)
    gsap.to(imageRef.current, {
      y: -8,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const handleLeave = () => {
    setIsHovered(false)
    gsap.to(imageRef.current, {
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div
        ref={imageRef}
        className="relative aspect-square w-full overflow-hidden rounded-2xl border border-dark/10 bg-dark/5 max-md:rounded-xl"
      >
        {before && (
          <img
            src={before}
            alt={`${name} before`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
        )}
        {after && (
          <img
            src={after}
            alt={`${name} after`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        <span className="absolute bottom-4 left-4 text-white">
          {isHovered ? 'After' : 'Before'}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3>{name}</h3>
          <h3>{price}</h3>
        </div>

        <Link to="/contact">
          <h3 className="hover:underline">Book now</h3>
        </Link>
      </div>

      <p className="mt-1 w-[60%] text-dark/70">{description}</p>
    </div>
  )
}

export default ResultCard
