import GitHubIcon from './icons/github';
import LinkedInIcon from './icons/linkedin';
import { Button } from './ui/button';

const socialLinks = [
  {
    href: 'https://github.com/alex289',
    label: 'Github',
    icon: <GitHubIcon />,
  },
  {
    href: 'https://www.linkedin.com/in/alexander-konietzko/',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
] as const;

export default function SocialIcons({ size }: { size?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {socialLinks.map(({ href, label, icon }) => (
          <Button
            asChild
            key={label}
            size="icon-lg"
            variant="ghost"
            className={`hover:text-primary transition-colors ${size}`}>
            <a
              aria-label={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer">
              {icon}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
