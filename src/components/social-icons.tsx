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
            key={label}
            size="icon-lg"
            variant="ghost"
            className={`transition-colors hover:text-primary ${size}`}
            nativeButton={false}
            render={
              <a
                aria-label={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              />
            }>
            {icon}
          </Button>
        ))}
      </div>
    </div>
  );
}
