import ResultCard from '../components/ResultCard.jsx'
import InstagramCarousel from '../components/InstagramCarousel.jsx'
import { useSanityQuery } from '../lib/useSanityQuery.js'
import { resultsPageQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanity.js'

function Results() {
  const { data } = useSanityQuery(resultsPageQuery)

  const heading = data?.heading ?? 'Results'
  const results = data?.results ?? []

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-16 max-md:px-3">
        <h1>{heading}</h1>

        <div className="mt-10 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          {results.map((result) => (
            <ResultCard
              key={result._id}
              name={result.name}
              price={result.price}
              description={result.description}
              before={result.before ? urlFor(result.before).width(800).url() : null}
              after={result.after ? urlFor(result.after).width(800).url() : null}
            />
          ))}
        </div>
      </div>

      <InstagramCarousel />
    </div>
  )
}

export default Results
