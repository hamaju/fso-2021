// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const total =
    blogs.length === 0
      ? 0
      : blogs.reduce((sum, current) => sum + current.likes, 0)

  return total
}

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  // convert the array to a map where each key is the author and
  // each value the accumulated sum of occurrences for that author
  // after that convert the map back into an array and map the
  // key/value pairs into objects
  const blogsByAuthor = Array.from(
    blogs.reduce(
      (m, blog) => m.set(blog.author, (m.get(blog.author) || 0) + 1),
      new Map()
    ),
    // eslint-disable-next-line no-shadow
    ([author, blogs]) => ({ author, blogs })
  )

  // find the author with the most blogs
  return blogsByAuthor.reduce((prev, current) =>
    prev.blogs > current.blogs ? prev : current
  )
}

const mostLikes = (blogs) => {
  const likesByAuthor = Array.from(
    blogs.reduce(
      (m, { author, likes }) => m.set(author, (m.get(author) || 0) + likes),
      new Map()
    ),
    ([author, likes]) => ({ author, likes })
  )

  return likesByAuthor.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
