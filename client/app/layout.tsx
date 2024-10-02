import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/Util/ReactQueryProvider";
import Natfication from "@/Util/Natfication";
import Nav from "@/components/NavBar/Nav";
import ReduxProvider from "@/Util/ReduxProvider";
import Footer from "@/components/Footer/Footer";


export const metadata: Metadata = {
  title: "ELSNOTY STORE",
  description: "E-commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="flex flex-col min-h-screen justify-between">
        <ReactQueryProvider>
          <ReduxProvider>
          <Natfication>
            <Nav />
            {children}
            <Footer />
          </Natfication>
          </ReduxProvider>
        </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
