"use client";
import { Container } from "@/app/_components/Container";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import TransitionLink from "../ui/TransitionLink";
import Image from "next/image";
import { useUserDetail } from "@/hooks";
import { UserButton, useUser } from "@clerk/nextjs";
import { CirclePoundSterling } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Styles", href: "#styles" },
  { label: "How It Works", href: "#how" },
];

const Navbar = () => {
  const { userDetail } = useUserDetail();
  const { user } = useUser();
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

        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex gap-2 p-1 px-3 items-center bg-slate-100 rounded-xl">
              <h2 className="flex items-center justify-center gap-2 text-sm">
                <CirclePoundSterling className="size-4" />
                {userDetail?.credit} Credits
              </h2>
            </div>
            <UserButton />
          </div>
        ) : (
          <Link
            href="/dashboard"
            className={`${buttonVariants({ variant: "default", size: "sm" })} rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90`}
          >
            Try Luxign Now
          </Link>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
