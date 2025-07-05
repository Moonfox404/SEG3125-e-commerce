const MAX_SQUARE_DISPLAY = 3;

type ColourSquaresProps = {
  colours: string[];
}

const ColourSquares = ({ colours }: ColourSquaresProps) => {
  const overflow = colours.length - MAX_SQUARE_DISPLAY;

  return (
    <div className="grid grid-cols-4 w-full h-4">
      {colours.slice(0, Math.min(colours.length, MAX_SQUARE_DISPLAY)).map((colour, idx) => {
        return <div key={idx} style={{backgroundColor: colour}} className="col mx-0.5"></div>;
      })}
      {overflow > 0 && <div className="col">+ {overflow}</div>}
    </div>
  );
}

export default ColourSquares;
