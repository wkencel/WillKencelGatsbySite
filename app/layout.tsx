import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://willkencel.io"),
  title: {
    default: "Will Kencel",
    template: "%s | Will Kencel",
  },
  description:
    "Will Kencel — Software Engineer at Microsoft. Writing about software engineering, AI, and technology.",
  openGraph: {
    title: "Will Kencel",
    description: "Software Engineer at Microsoft",
    url: "https://willkencel.io",
    siteName: "Will Kencel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@captkubernetes",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
