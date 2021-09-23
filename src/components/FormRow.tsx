import type * as React from "react";

interface Props {
  children: React.ReactNode;
  justify?: boolean;
  gridLike?: boolean;
}

export const FormRow = ({ justify = true, gridLike, children }: Props) => {
  return (
    <div
      className={`mb-3 w-full ${gridLike ? "grid grid-cols-4" : "flex"} gap-2 ${
        justify && "justify-between"
      }`}
    >
      {children}
    </div>
  );
};
