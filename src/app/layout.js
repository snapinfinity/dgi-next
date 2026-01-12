import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
