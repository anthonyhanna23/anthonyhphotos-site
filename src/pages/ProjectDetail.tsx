import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="px-6 md:px-12 py-16 md:py-24 text-center">
        <h1 className="font-serif text-3xl">Project not found</h1>
        <Link to="/projects" className="font-sans text-sm text-muted-foreground editorial-link mt-4 inline-block">← Back to projects</Link>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 md:px-12 py-16 md:py-24">
        <Link to="/projects" className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 mb-10">
          <ArrowLeft size={14} /> All Projects
        </Link>

        <h1 className="font-serif text-3xl md:text-5xl tracking-tight">{project.title}</h1>
        <p className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground mt-2">{project.category}</p>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {project.photos.map((src, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer group overflow-hidden"
              onClick={() => setLightbox(i)}
            >
              <img
                src={src}
                alt={`${project.title} — photo ${i + 1}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading={i < 4 ? "eager" : "lazy"}
              />
            </div>
          ))}
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
            src={project.photos[lightbox]}
            alt={`${project.title} — photo ${lightbox + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
