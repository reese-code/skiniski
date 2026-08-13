import Button from '../components/Button.jsx'

function Home() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-5 pb-5">
        <div className="relative h-180 w-full overflow-hidden rounded-[40px] bg-dark">
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

      <section id="services" />
    </div>
  )
}

export default Home
