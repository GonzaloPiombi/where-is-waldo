const Leaderboard = (props) => {
  return (
    <div className="modal" style={{ flexDirection: 'column' }}>
      {props.score.map((entry) => {
        return (
          <div key={entry.id} className="leaderboard-entry">
            <p>{entry.name}</p>
            <p>{entry.totalTime}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Leaderboard;
