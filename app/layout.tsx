import type { Metadata } from "next";
import { Geist, Geist_Mono , Michroma , Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ReportBuilder - Create Templates & Monthly Reports",
  description: "Build professional templates and generate comprehensive end-of-month reports for anything. Simple, powerful, and designed for your workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{fontFamily: "Poppins"}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
