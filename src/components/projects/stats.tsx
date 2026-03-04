import { AlertCircle, Book, GitPullRequest, History, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { type Stats } from '@/lib/github';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default async function Stats({ stats }: { stats: Stats }) {
  const t = await getTranslations('pages.projects.stats');
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col">
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <Star className="text-primary mr-2 h-5 w-5" />
                {t('stars')}:
              </span>
              <span>{stats?.stars ?? '-'}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <History className="text-primary mr-2 h-5 w-5" /> {t('commits')}
                :
              </span>
              <span>{stats?.totalCommits ?? '-'}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <GitPullRequest className="text-primary mr-2 h-5 w-5" />{' '}
                {t('prs')}:
              </span>
              <span>{stats?.prs ?? '-'}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <AlertCircle className="text-primary mr-2 h-5 w-5" />{' '}
                {t('issues')}:
              </span>
              <span>{stats?.issues ?? '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="flex items-center">
                <Book className="text-primary mr-2 h-5 w-5" />{' '}
                {t('contributed')}:
              </span>
              <span>{stats?.contributions ?? '-'}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('top-languages')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col">
            {stats?.topLanguages.map((lang) => (
              <li className="mb-2 flex justify-between" key={lang.name}>
                <div className="flex items-center">
                  <div
                    className="mr-2 inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: lang.color }}></div>
                  {lang.name}:
                </div>
                <span>{lang.count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
