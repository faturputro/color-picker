import ICardProps from "../interfaces/ICardProps";

const Card = (props: ICardProps) => {
  const style = {
    backgroundColor: props.hex,
  };

  return (
    <div className="card" onClick={() => props._onClick(props.hex)}>
      <div className="card-header">
        {
          props.dismissible && <button onClick={() => props._onRemove(props.hex)} type="button" className="card--close-btn">X</button>
        }
      </div>
      <div className="card-color--box" style={style}></div>
      <p>{ props.hex }</p>
    </div>
  );
}

export default Card;
