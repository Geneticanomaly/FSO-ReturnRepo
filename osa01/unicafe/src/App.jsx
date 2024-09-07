import {useState} from 'react';

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>
                {value} {text === 'positive' && '%'}
            </td>
        </tr>
    );
};

const Statistics = ({good, neutral, bad}) => {
    return (
        <div>
            {good == 0 && neutral == 0 && bad == 0 ? (
                <div>No feedback given</div>
            ) : (
                <table>
                    <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />
                        <StatisticLine text="all" value={good + neutral + bad} />
                        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
                        <StatisticLine text="positive" value={(good / (good + neutral + bad)) * 100} />
                    </tbody>
                </table>
            )}
        </div>
    );
};

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
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
