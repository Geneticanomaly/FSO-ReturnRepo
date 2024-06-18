import {useState} from 'react';

const Button = ({handleClick, text}) => {
    return <button onClick={() => handleClick(text)}>{text}</button>;
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleClick = (text) => {
        if (text === 'good') {
            setGood(good + 1);
        } else if (text === 'neutral') {
            setNeutral(neutral + 1);
        } else {
            setBad(bad + 1);
        }
    };

    return (
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={handleClick} text="good" />
            <Button handleClick={handleClick} text="neutral" />
            <Button handleClick={handleClick} text="bad" />
            <h1>Statistics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {good + neutral + bad}</p>
            <p>average {(good - bad) / (good + neutral + bad)}</p>
            <p>positive {(good / (good + neutral + bad)) * 100} %</p>
        </div>
    );
};

export default App;
