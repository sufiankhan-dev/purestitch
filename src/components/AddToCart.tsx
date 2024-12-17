// "use client";

// import React from "react";
// import { Button } from "./ui/button";
// import { useShoppingCart } from "use-shopping-cart";
// import { urlForImage } from "../../sanity/lib/image";

// export interface ProductCart {
//   name: string;
//   description: string;
//   price: number;
//   currency: string;
//   image: any;
//   price_id: string;
//   productId: any;
//   selectedSize?: any;
// }

// const AddToCart = ({
//   name,
//   description,
//   price,
//   currency,
//   image,
//   price_id,
//   productId,
//   selectedSize,
// }: ProductCart) => {
//   const { addItem, handleCartClick } = useShoppingCart();

//   const product = {
//     name: name,
//     description: description,
//     price: price,
//     currency: currency,
//     image: urlForImage(image),
//     price_id: price_id,
//     productId: productId,
//     selectedSize: selectedSize,
//   };
//   return (
//     <Button
//       className="w-full bg-black rounded-none uppercase font-normal hover:bg-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
//       onClick={() => {
//         addItem(product), handleCartClick();
//       }}
//     >
//       Add to cart
//     </Button>
//   );
// };

// export default AddToCart;

"use client";

import React from "react";
import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlForImage } from "../../sanity/lib/image";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  productId: any;
  selectedSize?: any;
  onAddToCart?: () => boolean | void; // Add a callback function prop
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
  price_id,
  productId,
  selectedSize,
  onAddToCart,
}: ProductCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlForImage(image),
    price_id: price_id,
    productId: productId,
    selectedSize: selectedSize,
  };

  const handleButtonClick = () => {
    // Check if onAddToCart exists and run it first
    const canAddToCart = onAddToCart ? onAddToCart() : true;

    if (canAddToCart) {
      addItem(product);
      handleCartClick();
    }
  };

  return (
    <Button
      className="w-full bg-black rounded-none uppercase font-normal hover:bg-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      onClick={handleButtonClick}
    >
      Add to cart
    </Button>
  );
};

export default AddToCart;
