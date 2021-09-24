import * as React from "react";
import onClickOutside from "react-cool-onclickoutside";
import { Themes } from "types/Theme";
import { Input } from "./Input";

type Props = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  themes: Themes;
};

export const Select = ({ onChange, value, name, themes }: Props) => {
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState("default");
  const [isOpen, setOpen] = React.useState(false);

  const isSelected = (key: string) => selected === key;
  const ref = onClickOutside(() => setOpen(false));

  const filtered = React.useMemo(() => {
    const keys = Object.keys(themes);
    return keys.filter((v) => v.toLowerCase().includes(search.toLowerCase()));
  }, [themes, search]);

  function handleSelected(key: string) {
    onChange?.({ target: { name, value: key } } as any);

    setOpen(false);
  }

  React.useEffect(() => {
    value && setSelected(value.toString());
  }, [value]);

  return (
    <div className={"relative"}>
      <button
        ref={ref}
        className="text-left p-2 px-3 w-full border-2 border-gray-300 rounded-lg focus:border-gray-500 transition-colors dark:border-[#4e4e4e] dark:bg-[#2f2f2f]"
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        {selected}
      </button>

      {isOpen && (
        <ul
          ref={ref}
          className="absolute w-full top-12 bg-[#2f2f2f] rounded-lg p-2 z-10 max-h-72 overflow-auto shadow-md"
        >
          <Input
            placeholder="Search themes.."
            className="w-full mb-1"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          {filtered.length <= 0 ? (
            <p className="py-2">No items found by that filter.</p>
          ) : (
            filtered.map((key) => (
              <li
                onClick={() => handleSelected(key)}
                key={key}
                className={`transition-colors w-full p-2 cursor-pointer hover:bg-[#444444] rounded-lg my-1 ${
                  isSelected(key) ? "bg-[#444444] font-semibold" : "font-normal"
                }`}
              >
                {key}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
