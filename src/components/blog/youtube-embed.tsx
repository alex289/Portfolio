'use client';

interface YouTubeEmbedProps {
  playlistId: string;
  title?: string;
}

export function YouTubeEmbed({ playlistId, title = 'YouTube Playlist' }: YouTubeEmbedProps) {
  return (
    <div className="my-8">
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

