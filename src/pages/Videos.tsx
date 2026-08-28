import { longFormVideos, shortFormReels } from "@/data/videos";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Videos = () => {
  return (
    <>
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-5xl">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Videos</h1>
        <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg">
          Selected video work
        </p>

        <Tabs defaultValue="short" className="mt-12">
          <TabsList>
            <TabsTrigger value="short">Short form</TabsTrigger>
            <TabsTrigger value="long">Long form</TabsTrigger>
          </TabsList>

          {/* Short form — Instagram Reels (portrait) */}
          <TabsContent value="short">
            {shortFormReels.length === 0 ? (
              <p className="mt-10 font-sans text-sm text-muted-foreground">
                Reels coming soon.
              </p>
            ) : (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16">
                {shortFormReels.map((reel) => (
                  <div key={reel.id} className="space-y-4">
                    <div className="aspect-[9/16] w-full max-w-[360px] mx-auto sm:mx-0">
                      <iframe
                        src={`https://www.instagram.com/${reel.type ?? "reel"}/${reel.instagramId}/embed`}
                        title={reel.title}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        scrolling="no"
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1 max-w-[360px] mx-auto sm:mx-0">
                      <h2 className="font-serif text-xl md:text-2xl tracking-tight">{reel.title}</h2>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">{reel.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Long form — YouTube (16:9) */}
          <TabsContent value="long">
            <div className="mt-10 space-y-20">
              {longFormVideos.map((video) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Videos;
