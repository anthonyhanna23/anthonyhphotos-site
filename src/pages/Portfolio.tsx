import { useState, useRef, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const modules = import.meta.glob<{ default: string }>(
  "../assets/Portfolio /*",
  { eager: true }
);

const photoMap: Record<string, string> = {};
for (const [path, mod] of Object.entries(modules)) {
  const filename = path.split("/").pop()!;
  photoMap[filename] = mod.default;
}

// ─── DEV TOGGLE ───────────────────────────────────────────────────────────────
const SHOW_FILENAMES = false; // flip to false to hide filename labels
// ──────────────────────────────────────────────────────────────────────────────

type Category = "people" | "places" | "sports" | "things";

// To reorder: move entries around.
// To add a photo: drop the file in src/assets/Portfolio/ and add an entry here.
// To categorize: change the category to "people" | "places" | "sports" | "things"
// To feature (2-col span): add featured: true
const order: { file: string; category: Category; featured?: boolean }[] = [
  { file: "DSCF7094.webp",                   category: "people",  featured: true  },
  { file: "OSU04187.webp",                    category: "sports"  },
  { file: "DSC07377.webp",                    category: "sports"  }, // OSU baseball player running bases
  { file: "DSC07594.webp",                    category: "sports"  }, // OSU baseball player with bat
  { file: "DSC07987.webp",                    category: "sports", }, // OSU baseball team celebrating
  { file: "OSU00891.webp",                    category: "sports",  featured: true  }, // OSU baseball batter, Bill Davis Stadium
  { file: "DSCF0154.webp",                    category: "things"  }, // McLaren sports car, fall foliage
  { file: "DSCF1186.webp",                    category: "people"  },
  { file: "DSCF2935.webp",                    category: "people", featured: true  },
  { file: "DSCF1284.webp",                    category: "people"  },
  { file: "DSCF1304-Enhanced-NR-Edit.webp",   category: "sports"  }, // tennis player with towel at net
  { file: "DSCF1310.webp",                    category: "people"  }, // fan with body paint smiley at game
  { file: "DSCF1333.webp",                    category: "places"  }, // snowy mountain road through windshield
  { file: "DSCF1428.webp",                    category: "people"  }, // woman in blue sweater, street portrait
  { file: "DSCF1609.webp",                    category: "people"  }, // man in park with flowers, thumbs up
  { file: "DSCF1626.webp",                    category: "people"  }, // family portrait, fall outdoors
  { file: "DSCF1909.webp",                    category: "places",  featured: true  }, // Jiufen Taiwan street with red lanterns
  { file: "DSCF2099.webp",                    category: "people"  },
  { file: "DSCF1020.webp",                    category: "people"  },
  { file: "DSCF2275.webp",                    category: "places"  },
  { file: "DSCF2329.webp",                    category: "places"  },
  { file: "DSCF2367-2.webp",                  category: "things"  }, // white BMW in snow
  { file: "DSCF2553.webp",                    category: "sports"  }, // person on ATV at night, dust + smoke
  { file: "DSCF2560.webp",                    category: "sports",  featured: true  }, // OSU football fans storming field
  { file: "DSCF8115.webp",                    category: "people"  },
  { file: "DSCF3208-Enhanced-NR.webp",        category: "sports"  }, // OSU women's hockey player
  { file: "DSCF6480.webp",                    category: "people"  }, // guitarist smiling on stage, B&W
  { file: "DSCF6972.webp",                    category: "people"  },
  { file: "000017450016.webp",                category: "places"  }, // Florence Italy cityscape, film
  { file: "DSCF3137-Enhanced-NR-Edit.webp",   category: "sports"  }, // hockey players entering rink, red smoke
  { file: "DSCF8188.webp",                    category: "people"  },
  { file: "DSCF8831.webp",                    category: "people"  },
  { file: "DSCF8858-3.webp",                  category: "people"  },
  { file: "DSCF1339.webp",                    category: "people", featured: true}, 
  { file: "DSCF8884.webp",                    category: "people"  },
  { file: "DSCF9052.webp",                    category: "people"  },
  { file: "DSCF1317.webp",                    category: "people"  },
  { file: "DSCF9207.webp",                    category: "people"  }, // graduation portrait at Ohio Stadium
  { file: "DSCF9219.webp",                    category: "people"  }, // graduation cap toss at Ohio Stadium
  { file: "DSCF9283.webp",                    category: "places"  }, // Es Vedrà rock Ibiza, from field
  { file: "DSCF9302.webp",                    category: "things"  }, // hands holding Ohio State ring
  { file: "DSCF9312.webp",                    category: "places"  }, // Es Vedrà rock from the sea
  { file: "DSCF9540.webp",                    category: "places"  }, // Barcelona taxi on city street
  { file: "DSCF9855.webp",                    category: "people"  }, // street portrait, man in suit, Florence
  { file: "edit3.webp",                       category: "sports"  }, // US Open tennis crowd diptych
  { file: "edits.webp",                       category: "sports"  }, // tennis player sitting with racket
  { file: "IMG_2064.webp",                    category: "things"  },
  { file: "DSCF0753.webp",                    category: "sports"  }, // football player in Eagles uniform
  { file: "DSCF2624-Edit-2.webp",             category: "people"  },
  { file: "IMG_5634.webp",                    category: "people"  }, // B&W person hugging pole in water
  { file: "IMG_5958.webp",                    category: "people"  }, // B&W film portrait, woman on street
  { file: "IMG_5974.webp",                    category: "people"  }, // B&W portrait, man in snowstorm
  { file: "000253050020.webp",                category: "people"  },
  { file: "DSCF8532.webp",                    category: "people"  },
  { file: "DSCF0719.webp",                    category: "sports"  }, // person kneeling on football field at night
  { file: "DSCF2774-Enhanced-SR.webp",        category: "people"  },
  { file: "DSCF2164-Edit.webp",               category: "things"  }, // skateboard wheels on shelf
  { file: "DSCF1500-Edit-2.webp",             category: "people"  },
];

const allPhotos = order
  .map(({ file, category, featured }) => ({ src: photoMap[file], category, file, featured }))
  .filter(({ src }) => Boolean(src));

const FILTERS: { label: string; value: "all" | Category }[] = [
  { label: "All",     value: "all"     },
  { label: "People",  value: "people"  },
  { label: "Places",  value: "places"  },
  { label: "Sports",  value: "sports"  },
  { label: "Things",  value: "things"  },
];

const GRID_GAP = 16; // column gap (px) and the spacing baked into each row span

const Portfolio = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [spans, setSpans] = useState<number[]>([]);
  const [portraitSet, setPortraitSet] = useState<Set<number>>(new Set());
  const photosRef = useRef<typeof allPhotos>([]);

  const recalc = useCallback(() => {
    const capRegular        = window.innerHeight * 0.65;
    const capFeatLandscape  = window.innerHeight * 0.70;
    const capFeatPortrait   = window.innerHeight * 0.85;
    const newPortraits = new Set<number>();
    const newSpans = itemRefs.current.map((el, i) => {
      if (!el) return 1;
      const img = el.querySelector("img") as HTMLImageElement | null;
      if (!img) return 1;
      const h = img.getBoundingClientRect().height;
      if (h === 0) return 1;
      const isPortrait = img.naturalHeight > img.naturalWidth;
      if (isPortrait) newPortraits.add(i);
      const isFeatured = photosRef.current[i]?.featured;
      const cap = !isFeatured ? capRegular
        : isPortrait ? capFeatPortrait
        : capFeatLandscape;
      const effective = Math.min(h, cap);
      return Math.ceil(effective) + GRID_GAP;
    });
    setPortraitSet(newPortraits);
    setSpans(newSpans);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, [recalc]);

  const photos = activeFilter === "all"
    ? allPhotos
    : allPhotos.filter(p => p.category === activeFilter);
  photosRef.current = photos;

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, photos.length);
    const id = setTimeout(recalc, 0);
    return () => clearTimeout(id);
  }, [photos, recalc]);

  return (
    <>
      <div className="px-6 md:px-12 pt-10 pb-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end gap-8 mb-14 animate-fade-up">
          <h1 className="font-serif font-medium text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
            <span className="block">Anthony</span>
            <span className="block">Hanna</span>
          </h1>
          <div className="hidden md:block w-px self-stretch bg-border" />
          <div className="md:max-w-xs lg:max-w-sm md:pb-2 space-y-5">
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              People-first photographer based in Columbus, Ohio. Specializing in sports &amp; event photography,
              street, and portraits. I love capturing the beauty in everyday interactions between people.
            </p>
            <Link
              to="/connect"
              className="inline-block font-sans text-xs tracking-[0.2em] uppercase py-3 px-8 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Book a Shoot
            </Link>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-12 border-b border-border pb-6">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                activeFilter === value
                  ? "text-foreground border-b-2 border-foreground pb-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 grid-flow-dense"
          style={{ gridAutoRows: "1px" }}
        >
          {photos.map(({ src, file, featured }, i) => {
            const isFeaturedPortrait = featured && portraitSet.has(i);
            const isFeaturedLandscape = featured && !portraitSet.has(i);
            const colSpan = isFeaturedLandscape ? "sm:col-span-2" : "";
            return (
            <div
              key={src}
              ref={el => { itemRefs.current[i] = el; }}
              className={`cursor-pointer group overflow-hidden relative ${colSpan}`}
              style={{
                gridRowEnd: `span ${spans[i] ?? 1}`,
                maxHeight: isFeaturedPortrait ? "85vh" : isFeaturedLandscape ? "70vh" : "65vh",
              }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={src}
                alt="Anthony Hanna Photography"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.03]"
                loading={i < 6 ? "eager" : "lazy"}
                onLoad={recalc}
              />
              {SHOW_FILENAMES && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 text-white text-[10px] font-mono px-2 py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  {file}
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-background/70 hover:text-background transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          <img
            src={photos[lightbox].src}
            alt="Anthony Hanna Photography"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default Portfolio;
