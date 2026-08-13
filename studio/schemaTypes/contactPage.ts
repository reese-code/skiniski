import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'contactInfoHeading',
      title: 'Contact info heading',
      type: 'string',
      initialValue: 'Contact info',
    }),
    defineField({
      name: 'calendarEmbedUrl',
      title: 'Calendar embed URL',
      description: 'Optional. If empty, a placeholder is shown.',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
