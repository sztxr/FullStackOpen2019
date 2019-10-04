import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
  const coursesSection = () => courses.map(item =>
    <section key={item.id}>
      <Header name={item.name} />
      <Content parts={item.parts}/>
    </section>
  )

  return (
    <>
      {coursesSection()}
    </>
  )
}

export default Course