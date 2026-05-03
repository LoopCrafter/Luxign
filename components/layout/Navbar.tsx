import { Container } from "@/app/_components/Container";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import TransitionLink from "../ui/TransitionLink";
import Image from "next/image";

const links = [
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Styles", href: "#styles" },
  { label: "How It Works", href: "#how" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <TransitionLink href="/dashboard">
          <button className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={100}
              height={50}
              className="object-cover h-[40px]"
            />
          </button>
        </TransitionLink>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className={`${buttonVariants({ variant: "default", size: "sm" })} rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90`}
        >
          Try Luxign Now
        </Link>
      </Container>
    </header>
  );
};

export default Navbar;
