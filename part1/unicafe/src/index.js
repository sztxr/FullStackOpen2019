import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good*1 + neutral*0 + bad*(-1)) / total;
  const positive = good / total * 100;
  if (total !== 0) {
    return (
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='total' value={total} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={`${positive}%`} />
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>;
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setToGood = (newValue) => setGood(newValue);
  const setToNeutral = (newValue) => setNeutral(newValue);
  const setToBad = (newValue) => setBad(newValue);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setToGood(good + 1)} text='good' />
      <Button onClick={() => setToNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setToBad(bad + 1)} text='bad' />

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
