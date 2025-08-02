import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common-components/header";
import Footer from "./components/common-components/footer";
import { LoaderProvider } from "./components/common-components/loaderProvider";
import "antd/dist/reset.css"; // required Antd v5+
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Apna OPD',
  description: 'A leading OPD booking platform in India that helps users find doctors and book appointments with ease.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'apple-touch-icon',
      url: '/favicon.ico',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Google Analytics Script Loader */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-97FLWC33JD"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-97FLWC33JD');
    `}
        </Script>

      </head>
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
