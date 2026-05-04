import { Container } from "@/src/components/layout/Container";
import Link from "next/link";

const links = [
  "Privacy Policy",
  "Terms of Service",
  "Contact",
  "Instagram",
  "Pinterest",
];

export const Footer = () => (
  <footer className="border-t border-border bg-background py-10">
    <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-semibold">Luxign</p>
        <p className="mt-1 text-xs text-muted-foreground">
          © 2026 Luxign AI. Architectural precision. Every pixel.
        </p>
      </div>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
        {links.map((link) => (
          <li key={link}>
            <Link href="#" className="transition-colors hover:text-foreground">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  </footer>
);
