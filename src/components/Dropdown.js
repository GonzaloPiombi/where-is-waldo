const Dropdown = (props) => {
  return (
    <div className="context-menu" style={{ top: props.y, left: props.x }}>
      <ul>
        <li onClick={props.onSelection}>Waldo</li>
        <li onClick={props.onSelection}>Whitebeard</li>
        <li onClick={props.onSelection}>Odlaw</li>
      </ul>
    </div>
  );
};

export default Dropdown;
