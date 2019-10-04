import React from 'react'
import Part from './Part'

const Course = ({ parts }) => {
  // console.log(parts);

  const partComponent = () => parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
  )

  const sum= () => parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      {partComponent()}
      <p><strong>total of {sum()} exercises</strong></p>
    </>
  )
}

export default Course