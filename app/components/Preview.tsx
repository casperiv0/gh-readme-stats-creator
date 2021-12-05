import * as React from "react";
import { useTransition } from "remix";
import { Button } from "./Button";

interface Props {
  url: string;
}

export const Preview = ({ url }: Props) => {
  const { state } = useTransition();
  const [isLoading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (state === "submitting") {
      setLoading(true);
    }

    if (state === "idle") {
      setLoading(false);
    }
  }, [state]);

  function handleCopy() {
    setCopied(true);
    navigator.clipboard.writeText(url);

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2_000);

    return () => {
      clearTimeout(timeout);
    };
  }

  return (
    <div className="flex flex-col mt-5">
      <h2 className="mb-3 text-2xl font-semibold">Preview</h2>

      <a rel="noopener noreferrer" target="_blank" href={url}>
        <img
          width={495}
          height={195}
          onLoad={() => setLoading(false)}
          src={url}
          className={
            isLoading ? "grayscale duration-500 blur-sm" : "grayscale-0 duration-500 blur-0"
          }
        />
      </a>

      <Button className="w-32 mt-3" disabled={copied} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy URL"}
      </Button>
    </div>
  );
};
