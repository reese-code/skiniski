function About() {
  return (
    <div className="px-5 py-16 max-md:px-3">
      <h1>About Kiana Smith</h1>

      <div className="mt-10 flex gap-5 max-md:flex-col">
        <div className="flex aspect-square w-1/2 items-center justify-center rounded-2xl bg-black text-white max-md:w-full ">
          Image
        </div>

        <p className="w-1/2 font-normal text-h2 max-md:w-full">
          <span className="font-editorial uppercase">Skin is Ki</span> is
          founded by Kiana Smith, who is a licensed esthetician who practices
          esthetics, and her services are waxing, facials, massages, and
          other dermatologist recommendations.
        </p>
      </div>
    </div>
  )
}

export default About
