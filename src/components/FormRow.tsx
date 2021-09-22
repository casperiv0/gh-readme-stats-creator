import type * as React from "react";

interface Props {
  children: React.ReactNode;
  justify?: boolean;
}

export const FormRow = ({ justify = true, children }: Props) => {
  return <div className={`mb-3 flex gap-3 ${justify && "justify-between"}`}>{children}</div>;
};
