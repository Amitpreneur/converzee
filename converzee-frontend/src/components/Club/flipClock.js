import React, { Component } from "react";
import "./flipClock.css";

// function component
const AnimatedCard = ({ animation, digit }) => {
    return(
      <div className={`flipCard ${animation}`}>
        <span>{digit}</span>
      </div>
    );
  };
  
  // function component
  const StaticCard = ({ position, digit }) => {
    return(
      <div className={position}>
        <span>{digit}</span>
      </div>
    );
  };
  
  // function component
  const FlipUnitContainer = ({ digit, shuffle, unit }) => {	
    // assign digit values
    let currentDigit = digit;
    let previousDigit = digit + 1;
  
    // to prevent a negative value
    if ( unit !== 'hours') {
      previousDigit = previousDigit === -1 
        ? 59 
        : previousDigit;
    } else {
      previousDigit = previousDigit === -1 
        ? 23 
        : previousDigit;
    }
  
    // add zero
    if ( currentDigit < 10 ) {
      currentDigit = `0${currentDigit}`;
    } 
    if ( previousDigit < 10 ) {
      previousDigit = `0${previousDigit}`;
    }
  
    // shuffle digits
    const digit1 = shuffle 
      ? previousDigit 
      : currentDigit;
    const digit2 = !shuffle 
      ? previousDigit 
      : currentDigit;
  
    // shuffle animations
    const animation1 = shuffle 
      ? 'fold' 
      : 'unfold';
    const animation2 = !shuffle 
      ? 'fold' 
      : 'unfold';

    return(
      <div className={'flipUnitContainer'}>
        <StaticCard 
          position={'upperCard'} 
          digit={currentDigit} 
          />
        <StaticCard 
          position={'lowerCard'} 
          digit={previousDigit} 
          />
        <AnimatedCard 
          digit={digit1}
          animation={animation1}
          />
        <AnimatedCard 
          digit={digit2}
          animation={animation2}
          />
      </div>
    );
  };
  
  // class component
class FlipClock extends Component {     
    constructor(props) {
        super(props);
        this.state = {
            seconds: 5000000,
            time: {},
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        let timer = this.updateTime(this.state.seconds);
        this.setState({ time: timer });
        this.startTimer();
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          time: this.updateTime(seconds),
          seconds: seconds,
        });
    
        // Check if we're at zero.
        if (seconds == 0) {
          clearInterval(this.timer);
        }
      }

    updateTime(sec) {
        // get new date
        const difference = +(new Date(this.props.date) || new Date().setHours(5)) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                // daysShuffle: true,
                // hoursShuffle: true,
                // minutesShuffle: true,
                // secondsShuffle: true,
            };
            // on hour change, update hours and shuffle state
            if( timeLeft['days'] !== this.state.time.days) {
                timeLeft['daysShuffle'] = !this.state.time.daysShuffle;   
            }
            // on hour change, update hours and shuffle state
            if( timeLeft['hours'] !== this.state.time.hours) {
                timeLeft['hoursShuffle'] = !this.state.time.hoursShuffle;   
            }
            // on minute change, update minutes and shuffle state
            if( timeLeft['minutes'] !== this.state.time.minutes) {
                timeLeft['minutesShuffle'] = !this.state.time.minutesShuffle;
            }
            // on second change, update seconds and shuffle state
            if( timeLeft['seconds'] !== this.state.time.seconds) {
                timeLeft['secondsShuffle'] = !this.state.time.secondsShuffle;
            }
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                daysShuffle:true,
                hoursShuffle:true,
                minutesShuffle:true,
                secondsShuffle:true
            };
        }
        return timeLeft
    }

    render() {
        // state object destructuring
        const { 
            days, 
            hours,
            minutes, 
            seconds, 
            daysShuffle, 
            hoursShuffle, 
            minutesShuffle, 
            secondsShuffle 
        } = this.state.time ;
        return(
            <div className={'flipClock'}>
                <FlipUnitContainer 
                    unit={'days'}
                    digit={days} 
                    shuffle={daysShuffle} 
                />
                <FlipUnitContainer 
                    unit={'hours'}
                    digit={hours} 
                    shuffle={hoursShuffle} 
                />
                <FlipUnitContainer 
                    unit={'minutes'}
                    digit={minutes} 
                    shuffle={minutesShuffle} 
                />
                <FlipUnitContainer 
                    unit={'seconds'}
                    digit={seconds} 
                    shuffle={secondsShuffle} 
                />
            </div>
        )
    }
}
  
export default FlipClock;
