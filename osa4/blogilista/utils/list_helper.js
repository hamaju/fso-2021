const _ = require('lodash');

const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total =
    blogs.length === 0
      ? 0
      : blogs.reduce((sum, current) => sum + current.likes, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

const mostBlogs = (blogs) => {
  // convert the array to a map where each key is the author and
  // each value the accumulated sum of occurrences for that author
  const totalBlogsByAuthor = blogs.reduce(
    (acc, blog) => acc.set(blog.author, (acc.get(blog.author) || 0) + 1),
    new Map()
  );

  const results = [];

  // entries() returns an array of arrays with all the key/value pairs;
  // construct objects in the desired format with them
  [...totalBlogsByAuthor.entries()].forEach((e) =>
    results.push({ author: e[0], blogs: e[1] })
  );

  // find the author with the most blogs
  const mostBlogsObj = results.reduce((prev, current) =>
    prev.blogs > current.blogs ? prev : current
  );

  return mostBlogsObj;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
