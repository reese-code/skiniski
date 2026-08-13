import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(Draggable, InertiaPlugin)

// Placeholder posts until real Instagram content/embeds are wired up.
const POSTS = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

// Tripled so the track can loop seamlessly: animating exactly one copy's
// worth of pixel width (including its gaps) lands on an identical looking
// position, so the infinite repeat/wrap snaps back unnoticed.
const CARDS = [...POSTS, ...POSTS, ...POSTS]

function InstagramCarousel() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

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
  }, [])

  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1289px] px-5 text-left max-md:px-3">
        <h2>As seen on #skiniski</h2>
      </div>

      <div ref={containerRef} className="mt-10 overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max cursor-grab gap-5 px-5 active:cursor-grabbing max-md:px-3"
        >
          {CARDS.map((post, index) => (
            <div
              key={`${post.id}-${index}`}
              className="aspect-[360/642] w-[360px] shrink-0 rounded-2xl bg-dark"
              // NOTE: black placeholder standing in for the Instagram post image
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default InstagramCarousel
