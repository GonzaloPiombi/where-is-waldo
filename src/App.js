import { useState } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import gameImage from './images/wally.jpg';
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import charactersInfo from './CharactersInfo';

function App() {
  const [dropdown, setDropdown] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [dropdownX, setDropdownX] = useState(null);
  const [dropdownY, setDropdownY] = useState(null);
  const [characters, setCharacters] = useState(charactersInfo);

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
    console.log(e);
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
          alert(`You found ${char.name}!`);
          checkForWin();
        } else {
          alert('Keep looking!');
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

  return (
    <div className="App">
      <Header />
      <img
        src={gameImage}
        alt="Where's Waldo"
        className="game-image"
        onClick={handleClick}
        draggable="false"
      />
      {dropdown ? (
        <Dropdown
          x={dropdownX}
          y={dropdownY}
          onSelection={handleSelection}
          characters={characters}
        />
      ) : null}
    </div>
  );
}

export default App;
