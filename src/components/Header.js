const Header = (props) => {
  return (
    <header>
      <h1>Where's Waldo</h1>
      <button onClick={props.onBtnClick}>?</button>
    </header>
  );
};

export default Header;
