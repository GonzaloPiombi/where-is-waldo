import waldo from '../images/waldo.jpg';
import odlaw from '../images/odlaw.jpg';
import wizard from '../images/wizard.jpg';

const Instructions = (props) => {
  return (
    <div className="modal">
      <div>
        <h1>Find them!</h1>
        <p>
          Try to find all of them in the shortest time possible to enter the
          leaderboards!
        </p>
        <div className="characters-container">
          <div>
            <img className="headshot" src={waldo} alt="waldo" />
            <p>Waldo</p>
          </div>
          <div>
            <img className="headshot" src={odlaw} alt="odlaw" />
            <p>Odlaw</p>
          </div>
          <div>
            <img className="headshot" src={wizard} alt="whitebeard" />
            <p>Whitebeard</p>
          </div>
        </div>
        <button onClick={props.onBtnClick}>Got it!</button>
      </div>
    </div>
  );
};

export default Instructions;
