import { useState } from 'react';
import waldo from '../images/waldo.jpg';

const WinMessage = (props) => {
  const [name, setName] = useState('');

  const playAgain = () => {
    window.location.href = window.location.href;
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="modal">
      <div className="container">
        <div className="win-message">
          <img className="win-image" src={waldo} alt="waldo" />
          <h1>You win!</h1>
          <img className="win-image" src={waldo} alt="waldo" />
        </div>
        <form onSubmit={(e) => props.formSubmit(e, name)}>
          <label htmlFor="name">Enter your name for the leaderboards!</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            maxLength="18"
            required
            autoFocus
            autoComplete="off"
          ></input>
          <button type="submit">Submit</button>
        </form>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default WinMessage;
