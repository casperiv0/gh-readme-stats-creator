import type * as React from "react";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select = ({ className, ...rest }: Props) => {
  return (
    <select
      className={`${className} p-2 border-2 border-gray-300 rounded-lg focus:border-gray-500 transition-colors dark:border-[#4e4e4e] dark:bg-[#2f2f2f]`}
      {...rest}
    />
  );
};
