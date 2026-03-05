import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  const nameArray = name.split(' ');
  const initials = nameArray.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
}
