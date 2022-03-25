const Snackbar = (props) => {
  return (
    <div className="snackbar" style={{ backgroundColor: props.content.color }}>
      {props.content.message}
    </div>
  );
};

export default Snackbar;
