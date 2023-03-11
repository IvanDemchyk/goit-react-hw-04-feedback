import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { FeedbackOption } from './FeedbackOptions/FeedbackOptions';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addFeed = feed => {
    switch (feed) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeeds = () => {
    return good + neutral + bad;
  };

  const positiveFeedsPercent = () => {
    return Math.round((good * 100) / countTotalFeeds());
  };

  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOption
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={addFeed}
        />
      </Section>

      {countTotalFeeds() ? (
        <Notification message="No feedback given" />
      ) : (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeeds()}
            positivePercentage={positiveFeedsPercent()}
          />
        </Section>
      )}
    </div>
  );
};
