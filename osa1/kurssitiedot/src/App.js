import React from 'react'

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part name={props.name} exercises={props.exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <>
      <Header course={course} />
      <Content
        name={course.parts[0].name}
        exercises={course.parts[0].exercises}
      />
      <Content
        name={course.parts[1].name}
        exercises={course.parts[1].exercises}
      />
      <Content
        name={course.parts[2].name}
        exercises={course.parts[2].exercises}
      />
      <Total
        exercises={
          course.parts[0].exercises +
          course.parts[1].exercises +
          course.parts[2].exercises
        }
      />
    </>
  )
}

export default App
