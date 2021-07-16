import Layout from '@/components/layout';
import Project from '@/components/projects';

export default function Index() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Hey, I’m Alexander Konietzko
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          I&apos;m a developer, writer, and creator. I work as the Head of
          Developer Relations at Vercel. You’ve found my personal slice of the
          internet –&nbsp;sign my guestbook while you&apos;re here or learn more
          about me.
        </h2>
        <h3
          id="about"
          className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          About
        </h3>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          I&apos;m a developer, writer, and creator. I work as the Head of
          Developer Relations at Vercel. You’ve found my personal slice of the
          internet –&nbsp;sign my guestbook while you&apos;re here or learn more
          about me.
        </h2>
        <h3
          id="projects"
          className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          Projects
        </h3>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          <Project />
        </h2>
      </div>
    </Layout>
  );
}
