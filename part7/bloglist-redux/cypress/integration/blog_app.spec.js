describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'superuser',
      username: 'root',
      password: 'secret',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'root', password: 'secret' })

      cy.contains('logged in as superuser')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(132, 32, 41)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'secret' })
    })

    it('a blog can be created', function () {
      cy.createBlog({
        title: 'test blog',
        author: 'tester',
        url: 'blog.example.com',
      })
      cy.contains('test blog by tester')
    })

    it('a blog can be liked', function () {
      cy.createBlog({
        title: 'blog',
        author: 'tester',
        url: 'blog.example.com',
      })
      cy.contains('blog by tester')

      cy.contains('view').click()
      cy.get('#like-button').click()

      cy.contains('likes 1')
    })

    it('a blog can be removed', function () {
      cy.createBlog({
        title: 'blog to be removed',
        author: 'tester',
        url: 'blog.example.com',
      })
      cy.contains('blog to be removed by tester')

      cy.contains('remove').click()
      cy.contains('blog to be removed by tester').should('not.exist')
    })
  })

  describe('After adding some blogs', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'secret' })

      cy.createBlog({
        title: 'blog one',
        author: 'author one',
        url: 'blog.example.com/1',
      })
      cy.createBlog({
        title: 'blog two',
        author: 'author two',
        url: 'blog.example.com/2',
      })
      cy.createBlog({
        title: 'blog three',
        author: 'author three',
        url: 'blog.example.com/3',
      })
    })

    it('they are ordered by likes from most liked to least liked', function () {
      cy.get('[id="blog"]').then(($blog) => {
        expect($blog).to.have.length(3)
      })
      // open up the details for all three blogs
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()

      cy.get('[id="like-button"]').then(($likeButtons) => {
        expect($likeButtons).to.have.length(3)
        // click some like buttons
        cy.get($likeButtons[2]).click() // blog three
        cy.wait(1000)
        cy.get($likeButtons[0]).click() // blog three again
        cy.wait(1000)
        cy.get($likeButtons[2]).click() // whatever is the last blog now
        cy.wait(1000)
      })

      // this could be done much better
      cy.get('[id="likes"]').then(($likes) => {
        expect($likes).to.have.length(3)
        expect($likes[0]).to.contain('likes 2')
        expect($likes[1]).to.contain('likes 1')
        expect($likes[2]).to.contain('likes 0')
      })
    })
  })
})
