import * as React from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { useSwitch } from "@react-aria/switch";

interface Props {
  children: React.ReactNode;
  name?: string;
  value?: string;
  defaultSelected?: boolean;
  onChange?: (v: boolean) => void;
}

export function Switch(props: Props) {
  const state = useToggleState({ ...props });
  const ref = React.useRef<HTMLInputElement>(null);
  const { inputProps } = useSwitch({ ...props }, state, ref);

  return (
    <label className="flex items-center">
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      <svg className="w-12 mr-1 transition-all h-7" aria-hidden="true">
        <rect
          x={4}
          y={4}
          width={40}
          height={20}
          rx={10}
          className="text-[#555]"
          fill={state.isSelected ? "currentColor" : "gray"}
        />
        <circle
          className="transition-all"
          cx={state.isSelected ? 34 : 14}
          cy={14}
          r={7}
          fill="white"
        />
      </svg>
      {props.children}
    </label>
  );
}
