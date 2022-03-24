import { useEffect, useState } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import gameImage from './images/wally.jpg';
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function App() {
  const [dropdown, setDropdown] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [dropdownX, setDropdownX] = useState(null);
  const [dropdownY, setDropdownY] = useState(null);

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
        let characters = [];
        snapshot.docs.forEach((doc) => {
          characters.push({ ...doc.data(), id: doc.id });
        });
        const char = characters.find(
          (char) => char.name === e.target.textContent
        );
        if (x > char.minX && x < char.maxX && y > char.minY && y < char.maxY) {
          //TODO Remove alerts and replace with a snackbar or similar.
          alert(`You found ${char.name}!`);
        } else {
          alert('Keep looking!');
        }
      })
      .catch((error) => console.log(error));

    setDropdown(!dropdown);
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
        <Dropdown x={dropdownX} y={dropdownY} onSelection={handleSelection} />
      ) : null}
    </div>
  );
}

export default App;
