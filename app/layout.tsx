import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Microlearning Coach",
  description: "Bite-sized, personalized learning for busy people.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
