import { Home, StarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Project } from '@/lib/github';
import GitHubIcon from '../icons/github';
import { Button } from '../ui/button';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardAction className="flex gap-3">
          {project.homepage && (
            <Button asChild variant="outline">
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors">
                <Home className="h-4 w-4 text-black dark:text-white" />
              </a>
            </Button>
          )}
          <Button asChild variant="outline">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors">
              <GitHubIcon className="h-4 w-4 text-black dark:text-white" />
            </a>
          </Button>
        </CardAction>
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <CardDescription className="max-w-2xl">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap content-center gap-2">
        {project.topics.map((topic) => (
          <Badge key={topic} variant="outline">
            {topic}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex gap-10">
        <div className="flex items-center">
          {project.language.color !== '' && (
            <div
              className="mr-2 inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: project.language.color }}></div>
          )}
          {project.language.name}
        </div>

        {project.stargazerCount > 0 && (
          <div className="flex items-center">
            <StarIcon className="text-primary mr-2 h-5 w-5" />
            {project.stargazerCount}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
