import { Container } from "@/src/components/layout/Container";
import Link from "next/link";
import { Shield, FileText, Mail } from "lucide-react";

const links = [
  {
    id: 1,
    title: "Privacy Policy",
    link: "/privacy",
    icon: <Shield className="size-5" />,
  },
  {
    id: 2,
    title: "Terms of Service",
    link: "/terms",
    icon: <FileText className="size-5" />,
  },
  {
    id: 3,
    title: "Contact",
    link: "/contact",
    icon: <Mail className="size-5" />,
  },
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
          <li key={link.id}>
            <Link
              href={link.link}
              className="transition-colors hover:text-foreground flex items-center gap-1"
            >
              {link.icon}
              <span className=""> {link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  </footer>
);
