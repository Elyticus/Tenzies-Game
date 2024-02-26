/* eslint-disable react/prop-types */
export default function Die(props) {
  const dynamicStyle = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div className="die-face" style={dynamicStyle} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>
    </div>
  );
}
