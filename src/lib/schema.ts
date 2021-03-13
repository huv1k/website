import { makeSchema, queryType, objectType } from 'nexus'

const huvik = objectType({
  name: 'Huvik',
  definition: (t) => {
    t.string('name')
    t.string('website')
  },
})

const query = queryType({
  definition: (t) => {
    t.field('me', {
      type: 'Huvik',
      resolve: () => {
        return { name: 'Huvik', website: 'https://huvik.dev/' }
      },
    })
  },
})

export const schema = makeSchema({
  types: [huvik, query],
})
