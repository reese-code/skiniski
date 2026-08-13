import Button from '../components/Button.jsx'
import AnimatedAboutText from '../components/AnimatedAboutText.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import InstagramCarousel from '../components/InstagramCarousel.jsx'
import hero from '../assets/hero.png'

const services = [
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    image: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    image: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    image: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    image: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    image: hero,
  },
  {
    name: 'Basic Facial',
    price: '$60',
    description: 'A 60-minute facial involving facial massages and masks',
    image: hero,
  },
]

function Home() {
  return (
    <div>
      <section className="mx-auto px-5 pb-5">
        <div
          className="relative w-full overflow-hidden rounded-[40px] bg-dark"
          style={{ height: 'calc(100vh - var(--navbar-height, 80px) - 20px)' }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-end justify-between gap-6 p-10">
            <div>
              <h1 className="max-w-[600px] text-white">
                Boast your skin&rsquo;s natural resilience
              </h1>
              <h3 className="mt-4 font-normal text-white">
                Soothing facials that rehydrate and improve skin
              </h3>
            </div>

            <Button to="/contact" variant="light" className="shrink-0">
              Book now
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1289px] px-5 py-20 text-left">
        <AnimatedAboutText />
      </section>

      <section
        id="services"
        className="mx-auto max-w-[1289px] px-5 py-20 text-left"
      >
        <h2>Services</h2>

        <div className="mt-10 grid grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

      <InstagramCarousel />
    </div>
  )
}

export default Home
