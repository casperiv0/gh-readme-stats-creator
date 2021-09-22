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

export const Toggle = ({ name, toggled, onClick }: Props) => {
  const defaultClassnames = "rounded-lg py-1 px-3 mr-1 transition-colors";

  return (
    <div>
      <button
        onClick={() => onClick({ target: { name, value: true } })}
        type="button"
        className={`${defaultClassnames} ${
          toggled === true ? "bg-gray-500 text-white" : "bg-gray-300"
        }`}
      >
        On
      </button>
      <button
        onClick={() => onClick({ target: { name, value: false } })}
        type="button"
        className={`${defaultClassnames} ${
          toggled === false ? "bg-gray-500 text-white" : "bg-gray-300"
        }`}
      >
        Off
      </button>
    </div>
  );
};
