import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'result',
  title: 'Result',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'before',
      title: 'Before image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'after',
      title: 'After image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'price', media: 'before'},
  },
})
