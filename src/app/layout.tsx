import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./Provider";
import Navbar from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxign — Design, Reimagined with AI",
  description:
    "Transform your space with Luxign. Upload your room, choose a style, and get stunning AI-generated interior designs in seconds. Experience smart, elegant, and effortless interior design powered by AI.",

  openGraph: {
    title: "Luxign — Design, Reimagined with AI",
    description:
      "Transform your space with Luxign. Upload your room, choose a style, and get stunning AI-generated interior designs in seconds. Experience smart, elegant, and effortless interior design powered by AI.",
    url: "/images/projects/luxign/hero.jpg",
    siteName: "Luxign",
    images: [
      {
        url: "/images/projects/luxign/hero.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luxign — AI Interior Design Platform",
    description:
      "Transform your space with Luxign. Upload your room, choose a style, and get stunning AI-generated interior designs in seconds.",
    images: ["/images/projects/luxign/hero.jpg"],
  },

  icons: {
    icon: [
      { url: "/icons/favicon.ico" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    // apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },

  // metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <Provider>
            <div className="flex flex-col gap-2 min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
