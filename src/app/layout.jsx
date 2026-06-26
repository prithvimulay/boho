import { Inter, Lora } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/src/components/client/providers/LenisProvider";
import NavigationBar from "@/src/components/server/NavigationBar";
import Footer from "@/src/components/server/Footer";
import StickyTalkButton from "@/src/components/client/ui/StickyTalkButton";

// 1. Initialize the fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});
export const metadata = {
  title: "BOHO Studio — Architecture & Interiors",
  description:
    "BOHO Studio crafts exceptional architecture and interior spaces inspired by the Mediterranean lifestyle and a contemporary interpretation of luxury.",
};

export default function RootLayout({ children }) {
  return (
    // 2. Inject the CSS variables into the HTML tag
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <LenisProvider>
          <NavigationBar />
          <main>{children}</main>
          <Footer />
          <StickyTalkButton />
        </LenisProvider>
      </body>
    </html>
  );
}