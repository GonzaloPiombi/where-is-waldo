const Dropdown = (props) => {
  return (
    <div className="context-menu" style={{ top: props.y, left: props.x }}>
      {props.characters.map((character) => {
        if (!character.found) {
          return (
            <div
              key={character.name}
              id={character.name}
              onClick={props.onSelection}
            >
              <img src={character.image} alt={character.name} />
              <p>{character.name}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Dropdown;
