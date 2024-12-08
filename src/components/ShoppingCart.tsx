"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "./ui/button";
import { useState } from "react";

const ShoppingCart = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    incrementItem,
    decrementItem,
    clearCart,
  } = useShoppingCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  function handleCheckoutClick(event: any) {
    event.preventDefault();
    window.location.href = "/checkout";
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw] dark:bg-gray-900">
        <SheetHeader>
          <SheetTitle className="uppercase dark:text-white">
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between -mx-6 dark:text-white">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
              {cartCount === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={"/empty-cart.png"}
                    alt="Empty cart Image"
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6 px-4 md:px-7">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-gray-200 dark:border-gray-700">
                        <Image
                          src={entry.image as string}
                          alt="product image"
                          width={100}
                          height={100}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3 className="line-clamp-1 sm:line-clamp-2">
                              {entry.name}
                            </h3>
                            <p className="ml-4">${entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm dark:text-gray-400 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex flex-row items-center gap-x-1">
                            <span
                              onClick={() => decrementItem(entry.id)}
                              className="cursor-pointer"
                            >
                              <MinusIcon className="w-5 h-5 dark:text-gray-400" />
                            </span>
                            <p className="dark:text-gray-400">
                              QTY: {entry.quantity}
                            </p>
                            <span
                              onClick={() => incrementItem(entry.id)}
                              className="cursor-pointer"
                            >
                              <PlusIcon className="w-5 h-5 dark:text-gray-400" />
                            </span>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium flex items-center gap-1 text-primary hover:text-red-600 dark:hover:text-red-400"
                              onClick={() => removeItem(entry.id)}
                            >
                              <Trash2 className="h-4 w-5 dark:text-gray-400" />
                              <span className="hidden sm:flex">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-gray-700">
            <div className="flex justify-between items-center text-base font-medium">
              <p className="uppercase font-medium">Subtotal:</p>
              <span>RS {totalPrice}</span>
            </div>
            <p className="text-sm dark:text-gray-400 font-light">
              Shipping and taxes will be calculated at checkout.
            </p>
            <div className="mt-1">
              <Button
                onClick={handleCheckoutClick}
                className="w-full bg-black dark:bg-gray-700 rounded-none uppercase dark:text-white"
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <Image
                    src="/spinner.svg"
                    alt="Loading"
                    width={20}
                    height={20}
                  />
                ) : (
                  "checkout"
                )}
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm">
              OR{" "}
              <button
                className="pl-2 font-medium text-primary hover:text-primary/80 uppercase"
                onClick={() => handleCartClick()}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
