import create from "zustand";

interface Store {
  fields: string[];
  setFields: (fields: string[]) => void;
}

const useDisabledStore = create<Store>((set) => ({
  fields: [],
  setFields: (fields) => set({ fields }),
}));

export function useDisabled() {
  const { fields, setFields } = useDisabledStore();

  function isDisabled(id: string) {
    return fields.includes(id);
  }

  function handleField(id: string, value: boolean) {
    if (value === true && isDisabled(id)) return;
    if (value === true) {
      setFields([...fields, id]);
    } else {
      setFields([...fields].filter((v) => v !== id));
    }
  }

  return { fields, handleField, isDisabled };
}
