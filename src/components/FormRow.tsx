import type * as React from "react";

interface Props {
  children: React.ReactNode;
}

export const FormRow = ({ children }: Props) => {
  return <div className="flex gap-1">{children}</div>;
};
