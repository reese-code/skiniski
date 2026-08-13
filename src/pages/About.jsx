import { useSanityQuery } from '../lib/useSanityQuery.js'
import { aboutPageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanity.js'

function About() {
  const { data } = useSanityQuery(aboutPageQuery)

  const heading = data?.heading ?? 'About Kiana Smith'
  const brandText = data?.brandText ?? 'Skin is Ki'
  const bodyText =
    data?.bodyText ??
    ' is founded by Kiana Smith, who is a licensed esthetician who practices esthetics, and her services are waxing, facials, massages, and other dermatologist recommendations.'
  const imageUrl = data?.image ? urlFor(data.image).width(1200).url() : null

  return (
    <div className="px-5 py-16 max-md:px-3">
      <h1>{heading}</h1>

      <div className="mt-10 flex gap-5 max-md:flex-col">
        <div className="flex aspect-square w-1/2 items-center justify-center overflow-hidden rounded-2xl bg-black text-white max-md:w-full max-md:rounded-xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={heading}
              className="h-full w-full object-cover"
            />
          ) : (
            'Image'
          )}
        </div>

        <p className="w-1/2 font-normal text-h2 max-md:w-full">
          <span className="font-editorial uppercase">{brandText}</span>
          {bodyText}
        </p>
      </div>
    </div>
  )
}

export default About
