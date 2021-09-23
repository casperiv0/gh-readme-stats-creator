import type * as React from "react";
import { Values } from "types/Values";

interface Props {
  label: string | React.ReactFragment;
  fieldId?: keyof Values;
  children: React.ReactChild | React.ReactChild[];
  includeMargin?: boolean;
}

export const FormField = ({ label, fieldId, children, includeMargin = true }: Props) => {
  return (
    <div className={`${includeMargin && "mb-3"} flex flex-col w-full`}>
      <label className="mb-2" htmlFor={fieldId}>
        {label}
      </label>
      {children}
    </div>
  );
};
