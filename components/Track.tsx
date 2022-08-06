import Image from 'next/future/image';

import type { Song } from '@/lib/types';

export default function Track(track: Song & { ranking: number }) {
  return (
    <div className="group mt-8 flex w-full max-w-3xl transform flex-row items-baseline border-b border-gray-200 transition-all hover:scale-[1.03] dark:border-gray-700">
      <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
        {track.ranking}
      </p>
      <div className="flex justify-self-auto">
        <div className="flex flex-col pl-3">
          <Image
            className="rounded-lg"
            src={track.cover}
            width={48}
            height={48}
            alt=""
          />
        </div>
        <div className="flex flex-col pl-3">
          <a
            className="w-60 truncate font-medium text-gray-900 group-hover:text-[#1bd760] dark:text-gray-100 group-hover:dark:text-[#1bd760] sm:w-96 md:w-full"
            href={track.songUrl}
            target="_blank"
            rel="noopener noreferrer">
            {track.title}
          </a>
          <p
            className="mb-4 w-60 truncate text-gray-500 sm:w-96 md:w-full "
            color="gray.500">
            {track.artist}
          </p>
        </div>
      </div>
    </div>
  );
}
