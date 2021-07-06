import React, { useState } from 'react'

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ]

  const noVotes = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(noVotes)
  const [mostVoted, setMostVoted] = useState(0)

  const getAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)

    const max = copy.indexOf(Math.max(...copy))
    setMostVoted(max)
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />

      <Button handleClick={vote} text="vote" />
      <Button handleClick={getAnecdote} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App
