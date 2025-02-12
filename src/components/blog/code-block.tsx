'use client';

import clsx from 'clsx';
import { ClipboardCheckIcon, ClipboardCopyIcon } from 'lucide-react';
import { useRef, useState } from 'react';

const CodeBlock = (props: { children: React.ReactNode }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };

  const onExit = () => {
    setHovered(false);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onCopy = async () => {
    setCopied(true);
    await navigator.clipboard.writeText(textInput.current?.textContent ?? '');
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative">
      <button
        aria-label="Copy code"
        type="button"
        className={clsx(
          'absolute cursor-pointer right-3 top-3 w-7 h-7 p-1 rounded-sm border-2 transition duration-200 border- bg-gray-200 dark:bg-gray-700',
          copied
            ? 'focus:outline-hidden focus:border-green-500 border-green-500 dark:border-green-400 dark:focus:border-green-400'
            : 'border-gray-300 dark:border-gray-300',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onCopy}>
        <div
          className={clsx(
            'transition duration-200',
            copied
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300',
          )}>
          {copied ? (
            <ClipboardCheckIcon className="w-4 h-4" />
          ) : (
            <ClipboardCopyIcon className="w-4 h-4" />
          )}
        </div>
      </button>

      <pre>{props.children}</pre>
    </div>
  );
};

export default CodeBlock;
