import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course.name}</h1>;

const Content = (props) => {
  // console.log(props.data.parts);
  const { parts } = props.data;
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
}

const Part = (props) => {
  // console.log(props);
  return (
    <p>{props.name} {props.exercises}</p>
  );
}

const Total = (props) => {
  // console.log(props.data.parts);
  const { parts } = props.data;
  const total = parts.reduce((prev, next) => prev + next.exercises, 0);
  return (
    <p>Number of exercises {total}</p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course}/>
      <Content data={course}/>
      <Total data={course}/>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
