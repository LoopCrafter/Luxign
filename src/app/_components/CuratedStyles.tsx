import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "../../components/layout/Section";

const styles = [
  { name: "Japandi", tag: "Peaceful & Warm", img: "/images/style-japandi.jpg" },
  {
    name: "Industrial",
    tag: "Raw & Urban",
    img: "/images/style-industrial.jpg",
  },
  {
    name: "Bohemian",
    tag: "Eclectic & Free",
    img: "/images/style-bohemian.jpg",
  },
  {
    name: "Scandinavian",
    tag: "Bright & Simple",
    img: "/images/style-scandinavian.jpg",
  },
];

export const CuratedStyles = () => (
  <Section id="styles" className="bg-background">
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
          Curated Styles
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Find the aesthetic that appeals to you.
        </p>
      </div>
      <div className="hidden gap-2 sm:flex">
        <button
          aria-label="Previous"
          className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-border transition hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-border transition hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>

    <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
      {styles.map((s) => (
        <article key={s.name} className="group cursor-pointer">
          <div className="overflow-hidden rounded-2xl shadow-soft">
            <img
              src={s.img}
              alt={`${s.name} interior style`}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="mt-3 text-sm font-semibold">{s.name}</h3>
          <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
            {s.tag}
          </p>
        </article>
      ))}
    </div>
  </Section>
);
