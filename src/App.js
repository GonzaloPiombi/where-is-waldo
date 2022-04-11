import { useState } from 'react';
import Header from './components/Header';
import Dropdown from './components/Dropdown';
import Instructions from './components/Instructions';
import gameImage from './images/wally.jpg';
import charactersInfo from './CharactersInfo';
import TargetBox from './components/TargetBox';
import Snackbar from './components/Snackbar';
import WinMessage from './components/WinMessage';
import Leaderboard from './components/Leaderboard';
import './App.css';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

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
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [id, setId] = useState(null);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const db = getFirestore();

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
    setSnackbar(false);
  };

  const handleSelection = (e) => {
    //Check if coordinates are within the character boundaries.
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
      const docRef = doc(db, 'leaderboard', id);
      updateDoc(docRef, {
        endTime: serverTimestamp(),
      });
      //Stop the timer.
      setIsGameRunning(false);
      //Display the win message.
      setIsGameOver(true);
    }
  };

  const handleInstructionsClick = () => {
    setIntructions(false);
    setIsGameRunning(true);
    const colRef = collection(db, 'leaderboard');
    addDoc(colRef, {
      name: '',
      startTime: serverTimestamp(),
      endTime: null,
      totalTime: null,
    }).then((docRef) => setId(docRef.id));
  };

  const showSnackbar = (message, color) => {
    setSnackbarMessage({ message: message, color: color });
    setSnackbar(true);
    setTimeout(() => {
      setSnackbar(false);
    }, 2500);
  };

  const submitScore = async (e, name) => {
    e.preventDefault();
    const docRef = doc(db, 'leaderboard', id);
    let score = null;
    const snapshot = await getDoc(docRef);
    const data = snapshot.data();
    score = data.endTime.seconds - data.startTime.seconds;

    await updateDoc(docRef, {
      name: name,
      totalTime: score,
    }).then(() => setIsLeaderboard(() => true));
  };

  const showLeaderboard = () => {
    setIsLeaderboard(true);
  };

  const closeLeaderboard = () => {
    setIsLeaderboard(false);
  };

  return (
    <div className="App">
      {instructions ? (
        <Instructions onBtnClick={handleInstructionsClick} />
      ) : null}
      <Header
        onBtnClick={handleInstructionsClick}
        characters={characters}
        isGameRunning={isGameRunning}
        showLeaderboard={showLeaderboard}
      />
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
      {isGameOver ? <WinMessage formSubmit={submitScore} /> : null}
      {isLeaderboard ? (
        <Leaderboard
          closeLeaderboard={closeLeaderboard}
          colRef={collection(db, 'leaderboard')}
        />
      ) : null}
    </div>
  );
}

export default App;
