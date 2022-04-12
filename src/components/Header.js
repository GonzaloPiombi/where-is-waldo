import { useEffect, useState } from 'react';
import Timer from './Timer';

const Header = (props) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () =>
      window.scrollY === 0 ? setOpacity(1) : setOpacity(0.8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{ opacity: opacity }}>
      <div className="header-section">
        <h1>Where's Waldo</h1>
        <div>
          {props.characters.map((character) => (
            <img
              style={{ opacity: character.found ? 0.2 : 1 }}
              className="headshot"
              src={character.image}
              alt={character.name}
              key={character.name}
            />
          ))}
        </div>
      </div>
      <div className="header-section">
        <Timer isGameRunning={props.isGameRunning} />
        <button onClick={props.showLeaderboard}>Leaderboard</button>
      </div>
    </header>
  );
};

export default Header;
