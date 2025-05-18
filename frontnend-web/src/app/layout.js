import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common-components/header";
import Footer from "./components/common-components/footer";
import { LoaderProvider } from "./components/common-components/loaderProvider";
import "antd/dist/reset.css"; // required Antd v5+

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Apna OPD",
  description: "Apna OPD is a platform for booking appointments with doctors.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LoaderProvider>
          <Header />
          {children}
          <Footer />
        </LoaderProvider>
      </body>
    </html>
  );
}
