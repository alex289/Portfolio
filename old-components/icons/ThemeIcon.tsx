import { Moon, Sun } from 'lucide-react';

const ThemeToggleIcon = ({ theme }: { theme: string | undefined }) => {
  return theme === 'dark' ? (
    <Sun fill="#EAEAEA" className="h-4 w-4 dark:text-gray-200" />
  ) : (
    <Moon fill="#222222" className="h-4 w-4 text-gray-800" />
  );
};

export default ThemeToggleIcon;
