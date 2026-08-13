import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      initialValue: "Boast your skin's natural resilience",
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero subheading',
      type: 'string',
      initialValue: 'Soothing facials that rehydrate and improve skin',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
      description: 'Optional. Leave empty to keep the plain dark background.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'aboutBrandText',
      title: 'About section brand text',
      description: 'The bold uppercase brand name shown at the start of the animated about paragraph.',
      type: 'string',
      initialValue: 'Skin is Ki',
    }),
    defineField({
      name: 'aboutBodyText',
      title: 'About section body text',
      description: 'The rest of the animated about paragraph, following the brand text.',
      type: 'text',
      rows: 4,
      initialValue:
        ' is founded by Kiana Smith, who is a licensed esthetician who practices esthetics, and her services are waxing, facials, and massages, and other dermatologist recommendations.',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services section heading',
      type: 'string',
      initialValue: 'Services',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
    }),
    defineField({
      name: 'instagramHeading',
      title: 'Instagram section heading',
      type: 'string',
      initialValue: 'As seen on #skiniski',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
