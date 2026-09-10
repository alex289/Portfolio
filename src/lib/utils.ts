export function getInitials(name: string): string {
  const nameArray = name.split(' ');
  const initials = nameArray.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
}
