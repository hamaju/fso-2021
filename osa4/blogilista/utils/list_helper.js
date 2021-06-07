const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total =
    blogs.length === 0 ? 0 : blogs.reduce((sum, item) => sum + item.likes, 0);

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
