import * as React from "react";
import classNames from "classnames";

type Props = JSX.IntrinsicElements["input"];

export const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    {...props}
    className={classNames(
      [
        "disabled:opacity-60 disabled:cursor-not-allowed",
        "bg-dark-gray border-[#4e4e4e] focus:border-gray-200",
        "p-1.5 px-3 border-[1.5px] rounded-md transition-colors",
      ],
      props.className,
    )}
    ref={ref}
  />
));
