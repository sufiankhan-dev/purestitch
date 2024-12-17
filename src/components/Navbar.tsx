"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LogOutIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useShoppingCart } from "use-shopping-cart";
import CategoriesMenu, { CategoryProps } from "./CategoriesMenu";
import { CategoriesItems } from "../../type";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Men", href: `/category/men` },
  { name: "Women", href: `/category/women` },
];

const Navbar = ({ Mensdata, Womensdata, Kidsdata }: CategoriesItems) => {
  const { handleCartClick, cartCount } = useShoppingCart();
  const pathname = usePathname();

  // Check if the current path is '/checkout'
  const isCheckoutPage = pathname === "/checkout";

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full flex justify-between items-center h-12 py-7 px-4 md:px-8 lg:px-32 container max-w-screen-2xl">
        <div className="flex flex-row gap-2">
          <CategoriesMenu
            MensData={Mensdata}
            WomensData={Womensdata}
            KidsData={Kidsdata}
          />
          <Link href={"/"}>
            <span className="text-2xl md:text-4xl font-extrabold italic flex items-center">
              PureFit
            </span>
          </Link>
        </div>
        <div className="cursor-pointer border-l md:border-none flex flex-row items-center gap-5">
          {!isCheckoutPage && ( // Conditionally render the cart icon
            <div
              className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:scale-110 transform transition-transform duration-200 cursor-pointer relative -mr-2"
              onClick={() => handleCartClick()}
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              {cartCount !== 0 && (
                <div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
                  {cartCount}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
