import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { useSanityQuery } from '../lib/useSanityQuery.js'
import { homePageQuery, instagramPostsQuery } from '../lib/queries.js'
import { urlFor } from '../lib/sanity.js'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Placeholder posts shown until real Instagram content is added in the Studio.
const PLACEHOLDER_POSTS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

function InstagramCarousel() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const { data: homeData } = useSanityQuery(homePageQuery)
  const { data: posts } = useSanityQuery(instagramPostsQuery)

  const heading = homeData?.instagramHeading ?? 'As seen on #skiniski'

  const items =
    posts && posts.length > 0
      ? posts.map((post) => ({
          id: post._id,
          imageUrl: urlFor(post.image).width(720).url(),
          link: post.link,
        }))
      : PLACEHOLDER_POSTS

  // Tripled so the track can loop seamlessly: animating exactly one copy's
  // worth of pixel width (including its gaps) lands on an identical looking
  // position, so the infinite repeat/wrap snaps back unnoticed.
  const CARDS = useMemo(() => [...items, ...items, ...items], [items])

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    const oneSetWidth = track.scrollWidth / 3
    const wrap = gsap.utils.wrap(-oneSetWidth, 0)

    const auto = gsap.to(track, {
      x: -oneSetWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    const [draggable] = Draggable.create(track, {
      type: 'x',
      inertia: true,
      onPress() {
        auto.pause()
      },
      onDrag() {
        this.x = wrap(this.x)
        gsap.set(track, { x: this.x })
      },
      onThrowUpdate() {
        this.x = wrap(this.x)
        gsap.set(track, { x: this.x })
      },
      onRelease() {
        if (!this.tween) auto.play()
      },
      onThrowComplete() {
        auto.play()
      },
    })

    const pause = () => auto.pause()
    const resume = () => {
      if (!draggable.isDragging && !draggable.isThrowing) auto.play()
    }

    container.addEventListener('mouseenter', pause)
    container.addEventListener('mouseleave', resume)

    return () => {
      auto.kill()
      draggable.kill()
      container.removeEventListener('mouseenter', pause)
      container.removeEventListener('mouseleave', resume)
    }
  }, [CARDS])

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1289px] px-5 text-left max-md:px-3">
        <h2>{heading}</h2>
      </div>

      <div ref={containerRef} className="mt-10 overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing max-md:px-3"
        >
          {CARDS.map((post, index) => {
            const card = (
              <div
                className="aspect-[360/642] w-[360px] shrink-0 overflow-hidden rounded-2xl bg-dark max-md:rounded-xl"
              >
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                )}
              </div>
            )

            return post.link ? (
              <a
                key={`${post.id}-${index}`}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
              >
                {card}
              </a>
            ) : (
              <div key={`${post.id}-${index}`}>{card}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default InstagramCarousel
