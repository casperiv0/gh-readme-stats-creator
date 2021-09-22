import type * as React from "react";
import { Values } from "types/Values";

interface Props {
  label: string | React.ReactFragment;
  fieldId?: keyof Values;
  children: React.ReactChild | React.ReactChild[];
}

export const FormField = ({ label, fieldId, children }: Props) => {
  return (
    <div className="mb-3 flex flex-col">
      <label className="mb-2" htmlFor={fieldId}>
        {label}
      </label>
      {children}
    </div>
  );
};
