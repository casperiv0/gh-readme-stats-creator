import type * as React from "react";

interface Props {
  children?: React.ReactChild | undefined;
  touched?: boolean;
}

export const Error = ({ touched, children }: Props) => {
  if (!touched && !children) {
    return null;
  }

  return <span className="-mt-0 text-red-500">{children}</span>;
};
