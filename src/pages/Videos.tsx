import { videos } from "@/data/videos";

const Videos = () => {
  return (
    <>
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Videos</h1>
        <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg">
          Selected video work — concert recaps, short films, and behind-the-scenes.
        </p>

        <div className="mt-14 space-y-20">
          {videos.map((video) => (
            <div key={video.id} className="space-y-4">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-xl md:text-2xl tracking-tight">{video.title}</h2>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Videos;
