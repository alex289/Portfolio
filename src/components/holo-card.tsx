'use client';

import { cn } from 'cn';
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function HoloCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const setPointer = (x: number, y: number, active: boolean) => {
    const root = rootRef.current;
    if (!root) return;

    root.dataset.active = String(active);
    root.style.setProperty('--holo-x', String(x));
    root.style.setProperty('--holo-y', String(y));
    root.style.setProperty('--holo-active', active ? '1' : '0');
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      setPointer(
        clamp((clientX - rect.left) / rect.width),
        clamp((clientY - rect.top) / rect.height),
        true,
      );
    });
  };

  const handleReset = () => {
    cancelAnimationFrame(frameRef.current);
    setPointer(0.5, 0.5, false);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') handleReset();
  };

  return (
    <div
      ref={rootRef}
      data-active="false"
      className={cn('holo-card', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleReset}
      onPointerUp={handlePointerUp}
      onPointerCancel={handleReset}>
      <div className="holo-card__inner">
        {children}
        <div className="holo-card__idle" aria-hidden />
        <div className="holo-card__shine" aria-hidden />
        <div className="holo-card__sparkle" aria-hidden />
        <div className="holo-card__glare" aria-hidden />
      </div>
    </div>
  );
}
