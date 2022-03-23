import { useState } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import gameImage from './images/wally.jpg';
import './App.css';

function App() {
  const [dropdown, setDropdown] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  const handleClick = (e) => {
    console.log(e);
    setDropdown(!dropdown);
    setX(e.pageX);
    setY(e.pageY);
    const width = e.target.offsetWidth;
    const height = e.target.offsetHeight;

    console.log(x, y, width, height);
    console.log(x / width, y / height);
  };

  return (
    <div className="App">
      <Header />
      <img
        src={gameImage}
        alt="Where's Waldo"
        className="game-image"
        onClick={handleClick}
      />
      {dropdown ? <Dropdown x={x} y={y} /> : null}
    </div>
  );
}

export default App;
