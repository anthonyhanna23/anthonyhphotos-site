import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <>
      <div className="px-6 md:px-12 py-16 md:py-24">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Projects</h1>
        <p className="font-sans text-sm text-muted-foreground mt-4 max-w-lg">
          A closer look at selected client work and personal projects.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((project) => (
            <Link key={project.slug} to={`/projects/${project.slug}`} className="group block">
              <div className="overflow-hidden">
                <img src={project.thumbnail} alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="mt-4 space-y-1">
                <h2 className="font-serif text-lg tracking-tight group-hover:opacity-70 transition-opacity duration-300">{project.title}</h2>
                <p className="font-sans text-xs tracking-[0.1em] uppercase text-muted-foreground">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
