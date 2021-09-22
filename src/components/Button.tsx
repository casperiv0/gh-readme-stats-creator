import type * as React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ className = "", ...rest }: Props) => {
  return (
    <button
      className={`${className} p-2 px-3 bg-gray-500 rounded-lg text-white hover:bg-gray-600 focus:bg-gray-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60`}
      {...rest}
    />
  );
};
