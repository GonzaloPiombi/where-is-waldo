import { useEffect, useState } from 'react';
import { query, orderBy, getDocs } from '@firebase/firestore';
import { formatTime } from '../helpers';

const Leaderboard = (props) => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    const q = query(props.colRef, orderBy('totalTime'));

    const showLeaderboard = async () => {
      return getDocs(q).then((snapshot) => {
        let score = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.totalTime === null) {
            return;
          } else {
            score.push({ ...doc.data(), id: doc.id });
          }
        });
        //Format the time as it is displayed as seconds currently.
        score.forEach((entry) => {
          entry.totalTime = formatTime(entry.totalTime);
        });
        return score;
      });
    };

    showLeaderboard().then((res) => {
      setScore(res);
    });
  }, []);

  return (
    <div className="modal">
      <div className="leaderboard-container">
        <div className="leaderboard-entry categories">
          <p>Name</p>
          <p>Time</p>
        </div>
        {score.map((entry) => {
          return (
            <div key={entry.id} className="leaderboard-entry">
              <p>{entry.name}</p>
              <p>{entry.totalTime}</p>
            </div>
          );
        })}
        <button onClick={props.closeLeaderboard}>Close</button>
      </div>
    </div>
  );
};

export default Leaderboard;
