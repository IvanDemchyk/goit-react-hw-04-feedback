import { Component } from 'react';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';
import { FeedbackOption } from './FeedbackOptions/FeedbackOptions';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeeds = () => {
    const { good, neutral, bad } = this.state;
    const result = good + neutral + bad;
    return result;
  };

  positiveFeedsPercent = () => {
    const result = this.countTotalFeeds();
    const { good } = this.state;
    const positive = (good * 100) / result;
    return Math.round(positive);
  };

  onLeaveFeedback = evt => {
    const name = evt.target.name;
    this.setState(prevState => ({ [name]: prevState[name] + 1 }));
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeeds();
    const positiveFeeds = this.positiveFeedsPercent();
    const keys = Object.keys(this.state);
    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOption
            options={keys}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        {total === 0 ? (
          <Notification message="No feedback given" />
        ) : (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positiveFeeds}
            />
          </Section>
        )}
      </div>
    );
  }
}
