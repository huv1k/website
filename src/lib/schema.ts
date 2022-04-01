import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'

const builder = new SchemaBuilder({
  plugins: [SimpleObjectsPlugin],
})

const huvik = builder.simpleObject('Huvik', {
  fields: (t) => ({
    name: t.string(),
    website: t.string(),
  }),
})

builder.queryType({
  fields: (t) => ({
    me: t.field({
      type: huvik,
      resolve: () => ({ name: 'Huvik', website: 'https://huvik.dev/' }),
    }),
  }),
})

export const schema = builder.toSchema({})
