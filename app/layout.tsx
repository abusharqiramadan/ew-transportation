import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "EW Transportation | Edmonton moving & courier services",
  description:
    "EW Transportation provides reliable, affordable moving and courier services across Edmonton with tailgate trucks, insured crews, and real-time tracking.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "EW Transportation | Edmonton moving & courier services",
    description:
      "Tailgate-equipped moving and courier crews delivering homes, offices, and specialty items safely across Edmonton.",
    url: "https://ew-transportation.ca",
    siteName: "EW Transportation",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "https://ew-transportation.ca/og-image.png",
        width: 1200,
        height: 630,
        alt: "EW Transportation - Tailgate-equipped moving and courier service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EW Transportation | Edmonton moving & courier services",
    description:
      "Edmonton's reliable movers and couriers with tailgate trucks, insured crews, and 24/7 dispatch support.",
    creator: "@ewtransport",
    images: ["https://ew-transportation.ca/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth bg-black">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-100 antialiased`}>{children}</body>
    </html>
  )
}