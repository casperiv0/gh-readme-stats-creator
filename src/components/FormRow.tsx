import type * as React from "react";

interface Props {
  children: React.ReactNode;
  justify?: boolean;
  flexLike?: boolean;
}

export const FormRow = ({ justify = true, flexLike = false, children }: Props) => {
  return (
    <div
      className={`mb-3 w-full ${
        flexLike ? "grid grid-cols-1 sm:flex" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      } gap-2 ${justify && "justify-between"}`}
    >
      {children}
    </div>
  );
};
