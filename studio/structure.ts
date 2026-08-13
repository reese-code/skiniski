import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = [
  {id: 'siteSettings', title: 'Site Settings'},
  {id: 'homePage', title: 'Home Page'},
  {id: 'aboutPage', title: 'About Page'},
  {id: 'contactPage', title: 'Contact Page'},
  {id: 'resultsPage', title: 'Results Page'},
]

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.id))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({id, title}) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string)
      ),
    ])
