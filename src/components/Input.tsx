import * as React from "react";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className = "", ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={`${className} p-2 border-2 border-gray-300 rounded-lg dark:border-[#4e4e4e] dark:bg-[#2f2f2f] disabled:opacity-60 disabled:cursor-not-allowed`}
      />
    );
  },
);
