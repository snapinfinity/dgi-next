import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://decograph.ae"),
  title: "Decograph Interiors | Interior Design & Fit-Out Studio",
  description:
    "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.",
  keywords: [
    "interior design",
    "fit-out",
    "commercial interiors",
    "residential design",
    "hospitality design",
    "retail interiors",
  ],
  openGraph: {
    title: "Decograph Interiors | Interior Design & Fit-Out Studio",
    description:
      "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.",
    url: "https://decograph.ae",
    siteName: "Decograph Interiors",
    images: [
      {
        url: "/android-chrome-192x192.png", // Ensure this image exists or is replaced
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decograph Interiors | Interior Design & Fit-Out Studio",
    description:
      "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.",
    images: ["/android-chrome-192x192.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overscroll-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overscroll-none`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
