import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Roboto_Condensed } from "next/font/google";
import Footer from "@/components/Footer";
import CartProvider from "@/components/Providers";
import ShoppingCart from "@/components/ShoppingCart";
import { client } from "../../sanity/lib/client";
import { CategoriesItems } from "../../type";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PureFit",
  description:
    "Shop your favorite products and explore our unlimited collection of products",
};

async function getMensData() {
  const query = `*[_type == 'mensCollections'][]{
  collectionName,
  "collectionSlug": collectionSlug.current
}
`;

  const data = await client.fetch(query);

  return data;
}

async function getWomensData() {
  const query = `*[_type == 'womensCollections']{
  collectionName,
  "collectionSlug": collectionSlug.current
}`;

  const data = await client.fetch(query);

  return data;
}

async function getKidsData() {
  const query = `*[_type == 'kidsCollections']{
  collectionName,
  "collectionSlug": collectionSlug.current
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Mensdata: CategoriesItems = await getMensData();
  const WomensData: CategoriesItems = await getWomensData();
  const KidsData: CategoriesItems = await getKidsData();

  return (
    <html lang="en">
      <body className={robotoCondensed.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Navbar
              Mensdata={Mensdata}
              Womensdata={WomensData}
              Kidsdata={KidsData}
            />
            <ShoppingCart />
            <Toaster />
            {children}
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
