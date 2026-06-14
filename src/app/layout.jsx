import "./globals.css";
import LenisProvider from "@/src/components/client/providers/LenisProvider";
import NavigationBar from "@/src/components/server/NavigationBar";
import Footer from "@/src/components/server/Footer";
import StickyTalkButton from "@/src/components/client/ui/StickyTalkButton";

export const metadata = {
  title: "BOHO Studio — Architecture & Interiors",
  description:
    "BOHO Studio crafts exceptional architecture and interior spaces inspired by the Mediterranean lifestyle and a contemporary interpretation of luxury.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
