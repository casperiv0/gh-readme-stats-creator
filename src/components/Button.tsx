import type * as React from "react";

type Props = JSX.IntrinsicElements["button"];

export const Button = ({ className = "", ...rest }: Props) => {
  return (
    <button
      className={`py-2 px-3 bg-gray-500 rounded-lg text-white hover:bg-gray-600 focus:bg-gray-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60 dark:bg-dark-gray dark:hover:bg-light-gray dark:focus:bg-light-gray ${className}`}
      {...rest}
    />
  );
};
