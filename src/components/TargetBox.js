const TargetBox = (props) => {
  return (
    <div
      className="target-box"
      style={{ top: props.y - 24, left: props.x - 24 }}
    ></div>
  );
};

export default TargetBox;
