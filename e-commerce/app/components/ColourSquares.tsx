const MAX_SQUARE_DISPLAY = 3;

type ColourSquaresProps = {
  colours: string[];
}

const ColourSquares = ({ colours }: ColourSquaresProps) => {
  const overflow = colours.length - MAX_SQUARE_DISPLAY;

  return (
    <div className="flex">
      {colours.slice(0, Math.min(colours.length, MAX_SQUARE_DISPLAY)).map((colour, idx) => {
        return <div key={idx} style={{backgroundColor: colour}} className="w-5 h-5 mx-0.5"></div>;
      })}
      {overflow > 0 && <div>+ {overflow}</div>}
    </div>
  );
}

export default ColourSquares;
