import { useState } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import Instructions from './components/Instructions';
import gameImage from './images/wally.jpg';
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import charactersInfo from './CharactersInfo';
import TargetBox from './components/TargetBox';
import Snackbar from './components/Snackbar';

function App() {
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownX, setDropdownX] = useState(null);
  const [dropdownY, setDropdownY] = useState(null);
  const [characters, setCharacters] = useState(charactersInfo);
  const [instructions, setIntructions] = useState(true);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const handleClick = (e) => {
    setX(
      Math.round(
        (e.nativeEvent.offsetX / e.nativeEvent.target.offsetWidth) * 100
      )
    );
    setY(
      Math.round(
        (e.nativeEvent.offsetY / e.nativeEvent.target.offsetHeight) * 100
      )
    );
    setDropdownX(e.pageX);
    setDropdownY(e.pageY);
    setDropdown(!dropdown);
  };

  const handleSelection = (e) => {
    //Check if coordinates are within the character boundaries.
    const db = getFirestore();
    const colRef = collection(db, 'characters');

    getDocs(colRef)
      .then((snapshot) => {
        let chars = [];
        snapshot.docs.forEach((doc) => {
          chars.push({ ...doc.data(), id: doc.id });
        });
        const char = chars.find((char) => char.name === e.target.id);
        if (x > char.minX && x < char.maxX && y > char.minY && y < char.maxY) {
          markAsFound(char.name);
          //TODO Remove alerts and replace with a snackbar or similar.
          showSnackbar(`You found ${char.name}!`, 'green');
          checkForWin();
        } else {
          showSnackbar(`${char.name} isn't there!`, 'red');
        }
      })
      .catch((error) => console.log(error));

    setDropdown(!dropdown);
  };

  const markAsFound = (name) => {
    const newArr = [...characters];
    const character = newArr.find((character) => character.name === name);
    character.found = true;
    setCharacters(newArr);
  };

  const checkForWin = () => {
    if (characters.every((character) => character.found === true)) {
      return alert('You win!');
    }
  };

  const handleInstructionsClick = () => {
    setIntructions(!instructions);
  };

  const showSnackbar = (message, color) => {
    setSnackbarMessage({ message: message, color: color });
    setSnackbar(true);
    setTimeout(() => {
      setSnackbar(false);
    }, 2500);
  };

  return (
    <div className="App">
      {instructions ? (
        <Instructions onBtnClick={handleInstructionsClick} />
      ) : null}
      <Header onBtnClick={handleInstructionsClick} characters={characters} />
      <img
        src={gameImage}
        alt="Where's Waldo"
        className="game-image"
        onClick={handleClick}
        draggable="false"
      />
      {dropdown ? (
        <div>
          <Dropdown
            x={dropdownX}
            y={dropdownY}
            onSelection={handleSelection}
            characters={characters}
          />{' '}
          <TargetBox x={dropdownX} y={dropdownY} />
        </div>
      ) : null}
      {snackbar ? <Snackbar content={snackbarMessage} /> : null}
    </div>
  );
}

export default App;
