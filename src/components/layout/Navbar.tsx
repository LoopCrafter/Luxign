"use client";
import { Container } from "@/src/components/layout/Container";
import TransitionLink from "../ui/TransitionLink";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { UserDropdown } from "../features/UserDropdown";

const links = [
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Styles", href: "#styles" },
  { label: "How It Works", href: "#how" },
];

const Navbar = () => {
  const { user } = useUser();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <TransitionLink href="/">
          <button className="flex items-center gap-2">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={100}
              height={50}
              className="object-cover h-[40px] scale-[1.3]"
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

        <UserDropdown />
      </Container>
    </header>
  );
};

export default Navbar;
