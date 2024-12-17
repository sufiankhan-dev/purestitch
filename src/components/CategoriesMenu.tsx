"use client";

import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, TruckIcon } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";

export interface CategoryProps {
  MensData: Array<{ collectionName: string; collectionSlug: string }>;
  WomensData: Array<{ collectionName: string; collectionSlug: string }>;
  KidsData: Array<{ collectionName: string; collectionSlug: string }>;
}

export default function CategoriesMenu({
  MensData,
  WomensData,
  KidsData,
}: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "men" | "women" | "kids"
  >("men");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const closeSheet = () => {
    setIsSheetOpen(false);
  };

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <div
          className="hover:scale-105 transform transition-transform duration-200 cursor-pointer"
          onClick={() => setIsSheetOpen(true)}
        >
          <HiOutlineMenuAlt2 className="h-8 w-8 md:h-10" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="sm:max-w-md w-[90vw] pl-10">
        <SheetHeader>
          <SheetTitle className="text-2xl md:text-4xl text-gray-900 font-extrabold italic -mt-2">
            <Link
              href={"/"}
              className="cursor-pointer dark:text-white"
              onClick={closeSheet}
            >
              PureFit
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-row gap-x-4 py-4 text-base font-normal uppercase cursor-pointer">
          <div onClick={() => setSelectedCategory("men")}>
            <span
              className={selectedCategory === "men" ? "font-extrabold" : ""}
            >
              Men
            </span>
          </div>
          <div onClick={() => setSelectedCategory("women")}>
            <span
              className={selectedCategory === "women" ? "font-extrabold" : ""}
            >
              Women
            </span>
          </div>
          <div onClick={() => setSelectedCategory("kids")}>
            <span
              className={selectedCategory === "kids" ? "font-extrabold" : ""}
            >
              Kids
            </span>
          </div>
        </div>
        <div className="pt-3">
          {/* {selectedCategory === "men" && (
            <ul className="capitalize text-lg">
              <Link
                href={"/category/men"}
                className="flex flex-row gap-x-2 hover:font-semibold"
                onClick={closeSheet}
              >
                <span>View All</span>
                <ArrowRight />
              </Link>
              {MensData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link
                    href={`/collection/men/${collection.collectionSlug}`}
                    onClick={closeSheet}
                  >
                    {collection.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {selectedCategory === "women" && (
            <ul className="capitalize text-lg">
              <Link
                href={"/category/women"}
                className="flex flex-row gap-x-2 hover:font-semibold"
                onClick={closeSheet}
              >
                <span>View All</span>
                <ArrowRight />
              </Link>
              {WomensData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link
                    href={`/collection/women/${collection.collectionSlug}`}
                    onClick={closeSheet}
                  >
                    {collection.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {selectedCategory === "kids" && (
            <ul className="capitalize text-lg">
              <Link
                href={"/category/kid"}
                className="flex flex-row gap-x-2 hover:font-semibold"
                onClick={closeSheet}
              >
                <span>View All</span>
                <ArrowRight />
              </Link>
              {KidsData.map((collection) => (
                <li
                  key={collection.collectionSlug}
                  className="hover:font-semibold"
                >
                  <Link
                    href={`/collection/kid/${collection.collectionSlug}`}
                    onClick={closeSheet}
                  >
                    {collection.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          )} */}
          {selectedCategory === "men" && (
            <ul className="capitalize text-lg">
              {MensData.length > 0 ? (
                <>
                  <Link
                    href={"/category/men"}
                    className="flex flex-row gap-x-2 hover:font-semibold"
                    onClick={closeSheet}
                  >
                    <span>View All</span>
                    <ArrowRight />
                  </Link>
                  {MensData.map((collection) => (
                    <li
                      key={collection.collectionSlug}
                      className="hover:font-semibold"
                    >
                      <Link
                        href={`/collection/men/${collection.collectionSlug}`}
                        onClick={closeSheet}
                      >
                        {collection.collectionName}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <p className="text-gray-500 text-2xl italic">Coming Soon</p>
              )}
            </ul>
          )}

          {selectedCategory === "women" && (
            <ul className="capitalize text-lg">
              {WomensData.length > 0 ? (
                <>
                  <Link
                    href={"/category/women"}
                    className="flex flex-row gap-x-2 hover:font-semibold"
                    onClick={closeSheet}
                  >
                    <span>View All</span>
                    <ArrowRight />
                  </Link>
                  {WomensData.map((collection) => (
                    <li
                      key={collection.collectionSlug}
                      className="hover:font-semibold"
                    >
                      <Link
                        href={`/collection/women/${collection.collectionSlug}`}
                        onClick={closeSheet}
                      >
                        {collection.collectionName}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <p className="text-gray-500 text-2xl italic">Coming Soon</p>
              )}
            </ul>
          )}

          {selectedCategory === "kids" && (
            <ul className="capitalize text-lg">
              {KidsData.length > 0 ? (
                <>
                  <Link
                    href={"/category/kid"}
                    className="flex flex-row gap-x-2 hover:font-semibold"
                    onClick={closeSheet}
                  >
                    <span>View All</span>
                    <ArrowRight />
                  </Link>
                  {KidsData.map((collection) => (
                    <li
                      key={collection.collectionSlug}
                      className="hover:font-semibold"
                    >
                      <Link
                        href={`/collection/kid/${collection.collectionSlug}`}
                        onClick={closeSheet}
                      >
                        {collection.collectionName}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <p className="text-gray-500 text-2xl italic">Coming Soon</p>
              )}
            </ul>
          )}
        </div>
        <div className="absolute bottom-10">
          {/* <div className="flex flex-row gap-x-2 pt-6 font-bold uppercase cursor-pointer">
            <p>Track your order</p>
            <TruckIcon />
          </div> */}
          <div className="flex items-center space-x-2 pt-2">
            <p className="uppercase font-bold">Dark Mode</p>
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleThemeSwitch}
              onClick={closeSheet}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
