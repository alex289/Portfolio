import { useRef, useState } from 'react';

type CopiedType = {
  copied: boolean;
};

const CopyIcon = ({ copied }: CopiedType) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
    fill="none"
    shapeRendering="geometricPrecision"
    className={`absolute top-3 right-1 h-6 w-6 transition-all duration-300 ease-in-out ${
      copied ? 'opacity-0' : ''
    }`}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
    />
  </svg>
);

export const CheckIcon = ({ copied }: CopiedType) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    className={`absolute top-3 right-1 stroke-green-500 transition-all duration-300 ease-in-out ${
      !copied ? 'opacity-0' : ''
    }`}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeBlock = (props: any) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    if (textInput.current && textInput.current.textContent) {
      navigator.clipboard.writeText(textInput.current.textContent);
    }
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div ref={textInput} className="relative">
      <button
        aria-label="Copy code"
        type="button"
        className="copy-code absolute right-2 hidden md:block"
        onClick={onCopy}>
        <CheckIcon copied={copied} />
        <CopyIcon copied={copied} />
      </button>

      <pre>{props.children}</pre>
    </div>
  );
};

export default CodeBlock;
