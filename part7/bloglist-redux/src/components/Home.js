import React from 'react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

const Home = () => {
  return (
    <div className="container">
      <h1 className="title is-3 has-text-weight-bold mt-5">Blogs</h1>
      <BlogForm />
      <div className="columns">
        <div className="column"></div>
        <BlogList />
        <div className="column"></div>
      </div>
    </div>
  )
}

export default Home
