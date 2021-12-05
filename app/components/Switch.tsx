import * as React from "react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useToggleState } from "@react-stately/toggle";
import { useSwitch } from "@react-aria/switch";
import { useFocusRing } from "@react-aria/focus";

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
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label className="flex items-center focus:bg-green-500">
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
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
        {isFocusVisible && (
          <rect
            x={3}
            y={3}
            width={42}
            height={22}
            rx={11}
            fill="none"
            stroke="#f5f5f5"
            strokeWidth={2}
          />
        )}
      </svg>
      {props.children}
    </label>
  );
}
