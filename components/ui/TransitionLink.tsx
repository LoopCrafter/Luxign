"use client";
import { animatePageOut } from "@/utils/animation";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
}

const TransitionLink = ({ href, children }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default TransitionLink;
