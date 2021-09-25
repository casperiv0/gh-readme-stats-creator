import * as React from "react";
import { Values } from "types/Values";

interface Event {
  target: {
    name: string;
    value: boolean;
  };
}

interface Props {
  toggled: boolean;
  onClick: (value: Event) => void;
  name: keyof Values;
}

enum Directions {
  RIGHT = 0,
  LEFT = 100,
}

export const Toggle = ({ name, toggled, onClick }: Props) => {
  const [x, setX] = React.useState(() => getDirection(toggled));

  React.useEffect(() => {
    setX(getDirection(toggled));
  }, [toggled]);

  return (
    <div className="bg-gray-300 dark:bg-[#2f2f2f] w-28 flex items-center justify-between gap-2 rounded-lg relative overflow-hidden">
      <div
        style={{ transform: `translateX(${x}%)` }}
        className="absolute bg-gray-500 dark:bg-[#6d6d6db7] h-10 w-14 pointer-events-none transition-all duration-100"
      />

      <button
        onClick={() => onClick({ target: { name, value: true } })}
        type="button"
        className={`w-full h-full p-2 px-3 cursor-pointer pointer-events-auto z-10 ${
          toggled && "text-white"
        }`}
      >
        On
      </button>
      <button
        onClick={() => onClick({ target: { name, value: false } })}
        type="button"
        className={`w-full h-full p-2 px-3 cursor-pointer pointer-events-auto z-10 ${
          !toggled && "text-white"
        }`}
      >
        Off
      </button>
    </div>
  );
};

function getDirection(toggled: boolean) {
  if (toggled === true) {
    return Directions.RIGHT;
  }

  return Directions.LEFT;
}
