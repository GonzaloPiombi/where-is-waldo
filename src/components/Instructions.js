import waldo from '../images/waldo.jpg';
import odlaw from '../images/odlaw.jpg';
import wizard from '../images/wizard.jpg';

const Instructions = (props) => {
  return (
    <div className="modal">
      <div className="container">
        <h1>Find them!</h1>
        <p>
          Try to find all of them in the shortest time possible to enter the
          leaderboards!
        </p>
        <div className="characters-container">
          <div>
            <img className="instructions-image" src={waldo} alt="waldo" />
            <p>Waldo</p>
          </div>
          <div>
            <img className="instructions-image" src={odlaw} alt="odlaw" />
            <p>Odlaw</p>
          </div>
          <div>
            <img className="instructions-image" src={wizard} alt="whitebeard" />
            <p>Whitebeard</p>
          </div>
        </div>
        <button onClick={props.onBtnClick} autoFocus>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Instructions;
