import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resultsPage',
  title: 'Results Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Results',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'result'}]}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Results Page'}
    },
  },
})
