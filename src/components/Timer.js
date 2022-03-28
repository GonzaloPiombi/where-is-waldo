import { useEffect, useState } from 'react';

const Timer = (props) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (props.isGameRunning) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      setTimer(0);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.isGameRunning]);

  const formatTime = (time) => {
    const seconds = `0${Math.round(time % 60)}`.slice(-2);
    const mins = `${Math.floor(time / 60)}`;
    const minutes = `0${Math.floor(mins % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  return <p>{formatTime(timer)}</p>;
};

export default Timer;
