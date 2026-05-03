import { Section } from "./Section";

const items = [
  {
    title: "Executive Workspace",
    sub: "Generated in 4.2 seconds",
    img: "/images/showcase-workspace.jpg",
    badge: { label: "New", tone: "primary" },
  },
  {
    title: "Serene Sanctuary",
    sub: "Generated in 3.8 seconds",
    img: "/images/showcase-sanctuary.jpg",
    badge: { label: "Minimalist", tone: "muted" },
  },
  {
    title: "Nordic Dining",
    sub: "Generated in 5.1 seconds",
    img: "/images/showcase-dining.jpg",
    badge: { label: "Curated", tone: "primary" },
  },
];

export const Showcase = () => (
  <Section id="gallery" className="bg-[#efeff0]">
    <div className="text-center">
      <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
        Showcase
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Real transformations by our community
      </p>
    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {items.map((it) => (
        <article
          key={it.title}
          className="group overflow-hidden rounded-2xl bg-background shadow-soft transition hover:-translate-y-1 hover:shadow-card"
        >
          <div className="relative overflow-hidden">
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className={
                "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider " +
                (it.badge.tone === "primary"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background/90 text-foreground")
              }
            >
              {it.badge.label}
            </span>
          </div>
          <div className="px-5 py-4">
            <h3 className="text-sm font-semibold">{it.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{it.sub}</p>
          </div>
        </article>
      ))}
    </div>
  </Section>
);
