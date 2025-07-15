import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { getPages } from "@/sanity/sanity-utils";
import Header from "./components/header";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dapo Sarumi",
  description: "Web creator, writer and photographer",
  icons: {
    icon: 'profile photo.ico'
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pages = await getPages();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.className} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-grow max-w-5xl mx-auto py-20 px-4 w-full">

          <Header pages={pages} />

          <hr className="mt-5" />
          <main className="pt-5">{children}</main>
        </div>

        <footer className="text-center text-gray-500 text-xs py-2">
          &copy;{" "}
          <a
            href="#webcreation"
            className="hover:text-black hover:underline transition-colors duration-200"
          >
            Dapo Sarumi
          </a>
          , {new Date().getFullYear()}.

        </footer>

      </body>
    </html>
  );
}
