import type * as React from "react";

interface Props {
  children: React.ReactNode;
  justify?: boolean;
  flexLike?: boolean;
}

export function Row({ justify = true, flexLike = false, children }: Props) {
  return (
    <div
      className={`my-5 w-full ${
        flexLike ? "grid grid-cols-1 sm:flex" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
      } gap-2 ${justify && "justify-between"}`}
    >
      {children}
    </div>
  );
}
