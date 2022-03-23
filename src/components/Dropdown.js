const Dropdown = (props) => {
  return (
    <div className="context-menu" style={{ top: props.y, left: props.x }}>
      <ul>
        <li>Waldo</li>
        <li>Wizard</li>
        <li>Odlaw</li>
      </ul>
    </div>
  );
};

export default Dropdown;
