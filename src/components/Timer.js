import { useEffect, useState } from 'react';
import { formatTime } from '../helpers';

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

  return <p>{formatTime(timer)}</p>;
};

export default Timer;
