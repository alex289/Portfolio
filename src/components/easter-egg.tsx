'use client';

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function EasterEgg() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    let index = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[index]) {
        index++;
        if (index === KONAMI_CODE.length) {
          setActivated((prev) => !prev);
          index = 0;
        }
      } else {
        index = e.key === KONAMI_CODE[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.classList.toggle('font-mono', activated);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activated]);

  useEffect(() => {
    console.log(
      '%cPssst... Try the Konami code!',
      'color: #888; font-size: 12px;',
    );
  }, []);

  return null;
}
