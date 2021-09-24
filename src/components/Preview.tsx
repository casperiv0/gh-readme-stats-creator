import * as React from "react";
import Image from "next/image";
import { GITHUB_URL } from "lib/generator";
import { Button } from "./Button";

interface Props {
  url: string;
}

export const Preview = ({ url }: Props) => {
  const [isLoading, setLoading] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const isDefaultUrl = url.includes(GITHUB_URL);

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
    <div className="mt-5 flex flex-col">
      <h2 className="text-2xl font-semibold mb-3">Preview</h2>

      <a rel="noopener noreferrer" target="_blank" href={url}>
        {isDefaultUrl ? (
          <Image
            onLoadStart={() => setLoading(true)}
            onLoadingComplete={() => setLoading(false)}
            className={
              isLoading ? "grayscale duration-500 blur-sm" : "grayscale-0 duration-500 blur-0"
            }
            src={url}
            width={495}
            height={195}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            onLoad={() => setLoading(false)}
            src={url}
            className={
              isLoading ? "grayscale duration-500 blur-sm" : "grayscale-0 duration-500 blur-0"
            }
          />
        )}
      </a>

      <Button className="mt-3 w-32" disabled={copied} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy URL"}
      </Button>
    </div>
  );
};
