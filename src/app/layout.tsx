import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Songbird AI | AI Music Generator with Custom Database",
  description:
    "Create stunning original music using Songbird AI. Upload your own database to generate songs matching your unique style. Free AI music generator.",
  icons: {
    icon: "https://i.imgur.com/9QX8Z5H.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
