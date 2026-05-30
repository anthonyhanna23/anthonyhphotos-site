import { Link } from "react-router-dom";

import concert1 from "@/assets/portfolio-concert-1.jpg";
import concert2 from "@/assets/portfolio-concert-2.jpg";
import street1 from "@/assets/portfolio-street-1.jpg";
import street2 from "@/assets/portfolio-street-2.jpg";
import portrait1 from "@/assets/portfolio-portrait-1.jpg";
import portrait2 from "@/assets/portfolio-portrait-2.jpg";
import heroImage from "@/assets/hero-concert.jpg";

const photos = [
  { src: heroImage, alt: "Concert photography by Anthony Hanna Columbus Ohio", span: "md:col-span-2 md:row-span-2" },
  { src: portrait1, alt: "Portrait photography by Anthony Hanna Columbus Ohio", span: "" },
  { src: street1, alt: "Street photography by Anthony Hanna Columbus Ohio", span: "" },
  { src: concert1, alt: "Live music photography Anthony Hanna Columbus Ohio", span: "" },
  { src: street2, alt: "Urban street photography Anthony Hanna Columbus Ohio", span: "" },
  { src: concert2, alt: "Concert event photography Anthony Hanna Columbus Ohio", span: "md:col-span-2" },
  { src: portrait2, alt: "Portrait session Anthony Hanna Columbus Ohio", span: "" },
];

const Index = () => {
  return (
    <>
      {/* Portfolio grid — full impact from the start */}
      <div className="px-4 md:px-10 lg:px-16 pb-20 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-[1600px] mx-auto">
        {photos.map((photo, i) => (
          <Link
            key={i}
            to="/portfolio"
            className={`${photo.span} relative overflow-hidden group`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading={i < 3 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Index;
