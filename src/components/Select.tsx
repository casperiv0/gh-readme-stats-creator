import type * as React from "react";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select = ({ className, ...rest }: Props) => {
  return (
    <select
      className={`${className} p-2 border-2 border-gray-300 rounded-lg focus:border-gray-500 transition-colors`}
      {...rest}
    />
  );
};
