export const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]`

export const homePageQuery = /* groq */ `*[_type == "homePage"][0]{
  ...,
  services[]->{_id, name, price, description, image}
}`

export const aboutPageQuery = /* groq */ `*[_type == "aboutPage"][0]`

export const contactPageQuery = /* groq */ `*[_type == "contactPage"][0]`

export const resultsPageQuery = /* groq */ `*[_type == "resultsPage"][0]{
  ...,
  results[]->{_id, name, price, description, before, after}
}`

export const instagramPostsQuery = /* groq */ `*[_type == "instagramPost"] | order(order asc){_id, image, link}`
