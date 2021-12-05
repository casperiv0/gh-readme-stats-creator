import { normalizeText } from "~/utils/utils";
import * as React from "react";
import { Check, ChevronDown } from "react-bootstrap-icons";
import onClickOutside from "react-cool-onclickoutside";
import { Themes } from "~/types/Theme";
import { Input } from "./Input";

type Props = Pick<JSX.IntrinsicElements["select"], "name"> & {
  themes: Themes;
};

export const Select = ({ name, themes }: Props) => {
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
    setSelected(key);

    setSearch("");
    setOpen(false);
  }

  React.useEffect(() => {
    isOpen && inputRef.current && inputRef.current?.focus();
  }, [isOpen]);

  return (
    <div className={"relative"}>
      <button
        id="theme"
        ref={ref}
        className={`flex items-center justify-between text-left p-2 px-3 w-full border-2 border-gray-300 rounded-lg focus:border-gray-500 transition-colors dark:border-[#4e4e4e] dark:bg-dark-gray ${
          isOpen ? "border-black dark:border-gray-400" : ""
        }`}
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        {normalizeText(selected)}

        <span>
          <ChevronDown
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="transition-all duration-200"
            style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          ref={ref}
          className="absolute z-20 w-full p-2 pt-0 overflow-auto bg-gray-200 rounded-lg shadow-md top-12 dark:bg-dark-gray max-h-80"
        >
          <div className="sticky top-0 pt-2 bg-gray-200 dark:bg-dark-gray">
            <Input
              placeholder="Search themes.."
              className="w-full pt-1 mb-1"
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
                className={`flex justify-between items-center transition-colors w-full p-2 cursor-pointer hover:bg-gray-300 focus:bg-gray-300 dark:hover:bg-light-gray dark:focus:bg-light-gray rounded-lg my-1 ${
                  isSelected(key) ? "bg-gray-300 dark:bg-light-gray font-medium" : "font-normal"
                }`}
              >
                {normalizeText(key)}

                {isSelected(key) ? (
                  <span>
                    <Check width="25px" height="25px" />
                  </span>
                ) : null}
              </button>
            ))
          )}
        </ul>
      )}

      <select className="hidden" defaultValue={selected} name={name}>
        <option value={selected}>{selected}</option>
      </select>
    </div>
  );
};
