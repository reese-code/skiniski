function Contact() {
  return (
    <div className="px-5 py-16 max-md:px-3">
      <h1>Contact</h1>

      <div className="mt-10 flex gap-5 max-md:flex-col">
        <div className="flex aspect-square w-1/2 items-center justify-center rounded-2xl bg-black/5 text-dark max-md:w-full">
          Calendar
        </div>

        <div className="flex w-1/2 flex-col gap-5 max-md:w-full">
          <h2>Contact info</h2>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/instagram.svg"
                alt="Instagram"
                width={27}
                height={27}
              />
              <img src="/tiktok.svg" alt="TikTok" width={23} height={26.5} />
            </div>

            <div>
              <h3>kianasmith@gmail.com</h3>
              <h3>(720) 601 2978</h3>
            </div>

            <p className="text-dark/70">
              6969 w 90th ave
              <br />
              Westminster, CO 80021
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
