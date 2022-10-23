// eslint-disable-next-line import/no-unresolved
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

const options: Partial<Options> = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('line--highlighted')
  },
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'A short description of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    image: {
      type: 'string',
      description: 'The image of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    readingTime: {
      type: 'string',
      resolve: (post) => readingTime(post.body.raw).text,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypeSlug],
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, options],
    ],
  },
})
