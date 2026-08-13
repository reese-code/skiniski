import { useSanityQuery } from '../lib/useSanityQuery.js'
import { contactPageQuery, siteSettingsQuery } from '../lib/queries.js'

function Contact() {
  const { data: page } = useSanityQuery(contactPageQuery)
  const { data: settings } = useSanityQuery(siteSettingsQuery)

  const heading = page?.heading ?? 'Contact'
  const contactInfoHeading = page?.contactInfoHeading ?? 'Contact info'
  const calendarEmbedUrl = page?.calendarEmbedUrl

  const email = settings?.email ?? 'kianasmith@gmail.com'
  const phone = settings?.phone ?? '(720) 601 2978'
  const addressLine1 = settings?.addressLine1 ?? '6969 w 90th ave'
  const addressLine2 = settings?.addressLine2 ?? 'Westminster, CO 80021'
  const instagramUrl = settings?.instagramUrl
  const tiktokUrl = settings?.tiktokUrl

  return (
    <div className="px-5 py-16 max-md:px-3">
      <h1>{heading}</h1>

      <div className="mt-10 flex gap-5 max-md:flex-col">
        <div className="flex aspect-square w-1/2 items-center justify-center rounded-2xl bg-black/5 text-dark max-md:w-full max-md:rounded-xl">
          {calendarEmbedUrl ? (
            <iframe
              src={calendarEmbedUrl}
              title="Booking calendar"
              className="h-full w-full rounded-2xl border-0 max-md:rounded-xl"
            />
          ) : (
            'Calendar'
          )}
        </div>

        <div className="flex w-1/2 flex-col gap-5 max-md:w-full">
          <h2>{contactInfoHeading}</h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <a href={instagramUrl || undefined}>
                <img
                  src="/instagram.svg"
                  alt="Instagram"
                  width={27}
                  height={27}
                />
              </a>
              <a href={tiktokUrl || undefined}>
                <img src="/tiktok.svg" alt="TikTok" width={23} height={26.5} />
              </a>
            </div>

            <div>
              <h3>{email}</h3>
              <h3>{phone}</h3>
            </div>

            <p className="text-dark/70">
              {addressLine1}
              <br />
              {addressLine2}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
