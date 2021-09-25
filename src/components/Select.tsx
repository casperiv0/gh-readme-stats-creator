import { normalizeText } from "lib/utils";
import * as React from "react";
import { Check } from "react-bootstrap-icons";
import onClickOutside from "react-cool-onclickoutside";
import { Themes } from "types/Theme";
import { Input } from "./Input";

type Props = Pick<JSX.IntrinsicElements["select"], "onChange" | "value" | "name" | "id"> & {
  themes: Themes;
};

export const Select = ({ onChange, id, value, name, themes }: Props) => {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("default");
  const [isOpen, setOpen] = React.useState(false);

  const isSelected = (key: string) => selected === key;
  const ref = onClickOutside(() => setOpen(false));
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filtered = React.useMemo(() => {
    const keys = Object.keys(themes);
    return keys.filter((v) => v.toLowerCase().includes(search.toLowerCase()));
  }, [themes, search]);

  function handleSelected(key: string) {
    onChange?.({ target: { name, value: key } } as any);

    setSearch("");
    setOpen(false);
  }

  React.useEffect(() => {
    value && setSelected(value.toString());
  }, [value]);

  React.useEffect(() => {
    isOpen && inputRef.current && inputRef.current?.focus();
  }, [isOpen]);

  return (
    <div id={id} className={"relative"}>
      <button
        id="theme"
        ref={ref}
        className={`text-left p-2 px-3 w-full border-2 border-gray-300 rounded-lg focus:border-gray-500 transition-colors dark:border-[#4e4e4e] dark:bg-[#2f2f2f] ${
          isOpen ? "border-black dark:border-gray-400" : ""
        }`}
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        {normalizeText(selected)}
      </button>

      {isOpen && (
        <ul
          ref={ref}
          className="absolute w-full top-12 bg-gray-200 dark:bg-[#2f2f2f] rounded-lg p-2 pt-0 z-20 max-h-80 overflow-auto shadow-md"
        >
          <div className="sticky top-0 pt-2 bg-gray-200 dark:bg-[#2f2f2f]">
            <Input
              placeholder="Search themes.."
              className="w-full mb-1 pt-1"
              onChange={(e) => setSearch(e.target.value)}
              ref={inputRef}
            />
          </div>

          {filtered.length <= 0 ? (
            <p className="py-2">No items found by that filter.</p>
          ) : (
            filtered.map((key) => (
              <button
                onClick={() => handleSelected(key)}
                key={key}
                className={`flex justify-between items-center transition-colors w-full p-2 cursor-pointer hover:bg-gray-300 focus:bg-gray-300 dark:hover:bg-[#444444] dark:focus:bg-[#444444] rounded-lg my-1 ${
                  isSelected(key) ? "bg-gray-300 dark:bg-[#444444] font-medium" : "font-normal"
                }`}
              >
                {normalizeText(key)}

                <span>{isSelected(key) && <Check width="25px" height="25px" />}</span>
              </button>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
