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
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    console.log(x, y, width, height);
    console.log(x / width, y / height);
  }, [x, y, width, height]);

  const handleClick = (e) => {
    setDropdown(!dropdown);
    setX(e.pageX);
    setY(e.pageY);
    setWidth(e.target.offsetWidth);
    setHeight(e.target.offsetHeight);
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
        if (
          x / width > char.minX &&
          x / width < char.maxX &&
          y / height > char.minY &&
          y / height < char.maxY
        ) {
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
      {dropdown ? <Dropdown x={x} y={y} onSelection={handleSelection} /> : null}
    </div>
  );
}

export default App;
