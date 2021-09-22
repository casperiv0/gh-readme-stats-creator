import * as React from "react";
import { Button } from "./Button";

interface Props {
  url: string;
}

export const Preview = ({ url }: Props) => {
  const [isLoading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  function handleCopy() {
    setCopied(true);
    navigator.clipboard.writeText(url);

    setTimeout(() => {
      setCopied(false);
    }, 2_000);
  }

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold mb-3">Preview</h2>

      <a rel="noopener noreferrer" target="_blank" href={url}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          onLoad={() => setLoading(false)}
          className={
            isLoading ? "grayscale duration-500 blur-sm" : "grayscale-0 duration-500 blur-0"
          }
          src={url}
        />
      </a>

      <Button className="mt-3 w-32" disabled={copied} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy URL"}
      </Button>
    </div>
  );
};
