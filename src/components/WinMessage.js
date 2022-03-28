import { useState } from 'react';

const WinMessage = (props) => {
  const [name, setName] = useState(null);

  const playAgain = () => {
    window.location.href = window.location.href;
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="modal">
      <div>
        <h1>You win!</h1>
        <p>Your time was: </p>
        <form onSubmit={(e) => props.formSubmit(e, name)}>
          <label htmlFor="name">Enter your name for the leaderboards!</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
          ></input>
          <button type="submit">Submit</button>
        </form>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default WinMessage;
