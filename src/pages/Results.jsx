import ResultCard from '../components/ResultCard.jsx'
import InstagramCarousel from '../components/InstagramCarousel.jsx'
import hero from '../assets/hero.png'

const results = [
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    before: hero,
    after: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    before: hero,
    after: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    before: hero,
    after: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    before: hero,
    after: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    before: hero,
    after: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    before: hero,
    after: hero,
  },
]

function Results() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 max-md:px-3">
        <h1>Results</h1>

        <div className="mt-10 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {results.map((result, index) => (
            <ResultCard key={index} {...result} />
          ))}
        </div>
      </div>

      <InstagramCarousel />
    </div>
  )
}

export default Results
