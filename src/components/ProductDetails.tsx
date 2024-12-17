"use client";

import React, { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import AddToCart from "@/components/AddToCart";
import DeliveryAndReturnDialog from "./DeliveryAndReturnDailog";
import DescriptionDropdown from "./DescriptionDropdown";

const ProductDetails = ({ data }: { data: any }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const discountedPrice = data.salePercent
    ? (data.price - (data.price * data.salePercent) / 100).toFixed(2)
    : null;

  const handleAddToCart = () => {
    if (data.sizes && !selectedSize) {
      setError("Please select a size.");
      return false; // Prevent adding to cart
    }
    setError(null);
    return true; // Allow adding to cart
  };

  return (
    <div className="md:py-8">
      {/* Product Header */}
      <div className="mb-2 md:mb-3 flex gap-y-2 flex-col">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase">
          {data.name}
        </h2>
        <p className="text-xs text-gray-800 dark:text-gray-300 uppercase">
          PF/{data.productId}/{new Date().getFullYear()}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-x-3 mb-4">
        {data.salePercent ? (
          <>
            <span className="line-through text-gray-700 dark:text-gray-400">
              Price: PKR {Math.round(data.price)}
            </span>
            <div className="bg-yellow-300 dark:bg-yellow-600 px-2 flex items-center">
              <span className="font-bold text-gray-900 dark:text-white">
                PKR {discountedPrice}
              </span>
              <span className="ml-2 text-sm text-gray-900 dark:text-white">
                -{data.salePercent}%
              </span>
            </div>
          </>
        ) : (
          <span className="font-bold text-gray-900 dark:text-gray-100 uppercase flex flex-row gap-x-4 text-lg">
            <span>Price:</span>
            <span>PKR {Math.round(data.price)}</span>
          </span>
        )}
      </div>

      <hr className="h-[2.5px] my-5 bg-gray-600 dark:bg-gray-400" />

      {/* Colors */}
      {data.colors && (
        <div className="flex gap-x-8 mb-4">
          <span className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase">
            Colors
          </span>
          <div className="flex gap-x-2">
            {data.colors.map((color: string, index: number) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-black dark:border-gray-300 cursor-pointer"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
      {data.sizes && (
        <div className="flex gap-x-8 mb-4 items-center">
          <span className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase">
            Size
          </span>
          <div className="flex gap-x-1">
            {data.sizes.map((size: string, index: number) => (
              <Toggle
                key={index}
                pressed={selectedSize === size}
                onPressedChange={() =>
                  setSelectedSize(selectedSize === size ? null : size)
                }
                className={`h-7 w-7 text-sm ${
                  selectedSize === size
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white text-black dark:bg-black dark:text-white"
                }`}
              >
                {size}
              </Toggle>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-x-8 items-center uppercase">
        <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
          Gender
        </span>
        <div className="flex gap-x-2 text-sm text-gray-900 dark:text-gray-100">
          {data.categoryName}
        </div>
      </div>

      <hr className="h-[2.5px] my-5 bg-gray-600 dark:bg-gray-400" />

      <AddToCart
        currency="PKR"
        description={data.description}
        image={data.image[0]}
        name={data.name}
        price={discountedPrice ? parseFloat(discountedPrice) : data.price}
        key={data._id}
        price_id={data.price_id}
        productId={data.productId}
        selectedSize={selectedSize}
        onAddToCart={handleAddToCart}
      />

      {data.fit && (
        <div className="flex gap-x-4 items-center uppercase pt-5">
          <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
            Fit
          </span>
          <div className="flex gap-x-2 text-sm text-gray-700 dark:text-gray-300">
            {data.fit}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-700 dark:text-gray-300 pt-5 leading-relaxed uppercase hidden md:block">
        <p>{data.description}</p>
      </div>

      {/* Composition and Care */}
      {data.compositionAndCare && data.compositionAndCare.length > 0 && (
        <div className="uppercase flex-col pt-5 hidden md:block">
          <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
            Composition & Care
          </span>
          <div className="pt-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            {data.compositionAndCare.map((item: any, index: any) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      )}

      <DeliveryAndReturnDialog />

      {/* Mobile Product Data Dropdown */}
      <DescriptionDropdown
        description={data.description}
        compositionAndCare={data.compositionAndCare}
      />
    </div>
  );
};

export default ProductDetails;
