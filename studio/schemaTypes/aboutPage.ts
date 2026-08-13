import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'About Kiana Smith',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'brandText',
      title: 'Body text — brand text',
      description: 'The bold uppercase brand name shown at the start of the paragraph.',
      type: 'string',
      initialValue: 'Skin is Ki',
    }),
    defineField({
      name: 'bodyText',
      title: 'Body text — rest of paragraph',
      description: 'The rest of the paragraph, following the brand text.',
      type: 'text',
      rows: 6,
      initialValue:
        ' is founded by Kiana Smith, who is a licensed esthetician who practices esthetics, and her services are waxing, facials, massages, and other dermatologist recommendations.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
