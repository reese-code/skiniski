import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

function ServiceCard({ image, name, price, description }) {
  const imageRef = useRef(null)

  const handleEnter = () => {
    gsap.to(imageRef.current, {
      y: -8,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const handleLeave = () => {
    gsap.to(imageRef.current, {
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {image ? (
        <img
          ref={imageRef}
          src={image}
          alt={name}
          className="aspect-square w-full rounded-2xl border border-dark/10 object-cover max-md:rounded-xl"
        />
      ) : (
        <div
          ref={imageRef}
          className="flex aspect-square w-full items-center justify-center rounded-2xl border border-dark/10 bg-dark/5 text-dark/40 max-md:rounded-xl"
        >
          No image
        </div>
      )}

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

export default ServiceCard
