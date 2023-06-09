export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date))

type Post = {
  date: string
}

export const sortByDate = (a: Post, d: Post) => {
  return new Date(d.date).getTime() - new Date(a.date).getTime()
}
