import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";


const inter = Inter({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Skip Size",
  description: "Choose Your Skip Size",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider >
        <body
          className={`${inter.className}antialiased`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
