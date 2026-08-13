import Button from '../components/Button.jsx'
import AnimatedAboutText from '../components/AnimatedAboutText.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import InstagramCarousel from '../components/InstagramCarousel.jsx'
import { useSanityQuery } from '../lib/useSanityQuery.js'
import { homePageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanity.js'

function Home() {
  const { data } = useSanityQuery(homePageQuery)

  const heroHeading = data?.heroHeading ?? "Boast your skin's natural resilience"
  const heroSubheading =
    data?.heroSubheading ?? 'Soothing facials that rehydrate and improve skin'
  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1920).url()
    : null
  const aboutBrandText = data?.aboutBrandText ?? 'Skin is Ki'
  const aboutBodyText =
    data?.aboutBodyText ??
    ' is founded by Kiana Smith, who is a licensed esthetician who practices esthetics, and her services are waxing, facials, and massages, and other dermatologist recommendations.'
  const servicesHeading = data?.servicesHeading ?? 'Services'
  const services = data?.services ?? []

  return (
    <div>
      <section className="mx-auto px-5 pb-5 max-md:px-3">
        <div
          className="relative w-full overflow-hidden rounded-[40px] bg-dark max-md:rounded-[12px]"
          style={{ height: 'calc(100vh - var(--navbar-height, 80px) - 20px)' }}
        >
          {heroImageUrl && (
            <img
              src={heroImageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-end justify-between gap-6 p-10 max-md:flex-col max-md:items-stretch max-md:justify-end max-md:gap-4 max-md:px-3 max-md:pt-0 max-md:pb-3">
            <div>
              <h1 className="max-w-[600px] text-white">{heroHeading}</h1>
              <h3 className="mt-4 font-normal text-white">{heroSubheading}</h3>
            </div>

            <Button to="/contact" variant="light" className="shrink-0 max-md:w-full">
              Book now
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1289px] px-5 py-20 text-left max-md:px-3">
        <AnimatedAboutText brandText={aboutBrandText} bodyText={aboutBodyText} />
      </section>

      <section
        id="services"
        className="mx-auto max-w-[1289px] px-5 py-20 text-left max-md:px-3"
      >
        <h2>{servicesHeading}</h2>

        <div className="mt-10 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              name={service.name}
              price={service.price}
              description={service.description}
              image={service.image ? urlFor(service.image).width(800).url() : null}
            />
          ))}
        </div>
      </section>

      <InstagramCarousel />
    </div>
  )
}

export default Home
