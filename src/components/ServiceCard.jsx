import { Link } from 'react-router-dom'

function ServiceCard({ image, name, price, description }) {
  return (
    <div>
      <img
        src={image}
        alt={name}
        className="aspect-square w-full rounded-2xl border border-dark/10 object-cover"
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3>{name}</h3>
          <h3>{price}</h3>
        </div>

        <Link to="/contact">
          <h3 className="underline">Book now</h3>
        </Link>
      </div>

      <p className="mt-1 text-dark/70 w-[60%]">{description}</p>
    </div>
  )
}

export default ServiceCard
