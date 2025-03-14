import React from "react";
import { client } from "../../sanity/lib/client";
import { simplifiedProduct } from "../../type";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'product' && salePercent == 70][0...4]{
    _id,
    price,
    name,
    productId,
    "imageUrl": image[0].asset->url,
    salePercent,
    colors
  }`;

  const data = await client.fetch(query);

  return data;
}

export const revalidate = 30;

const HotItems = async () => {
  const data: simplifiedProduct[] = await getData();

  return (
    <div>
      {data.length > 0 && (
        <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-32">
          <div className="flex justify-between items-center">
            <h2 className="underline text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row items-center gap-x-2">
              <Flame className="text-red-600" />
              Hot Items
            </h2>

            <Link
              className="text-primary dark:text-blue-400 flex items-center gap-x-1"
              href={"/sale"}
            >
              View All{" "}
              <span>
                <ArrowRight />
              </span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => {
              const discountedPrice = product.salePercent
                ? (
                    product.price -
                    (product.price * product.salePercent) / 100
                  ).toFixed(2)
                : null;

              return (
                <div key={product._id} className="group relative">
                  <Link href={`/product/${product.productId}`}>
                    <div className="aspect-square w-full overflow-hidden bg-newgray group-hover:opacity-75 lg:h-80">
                      <Image
                        src={product.imageUrl}
                        alt="Product Image"
                        className="object-contain w-full h-full object-center lg:h-full lg:w-full"
                        width={300}
                        height={300}
                        quality={100}
                        priority
                      />
                    </div>

                    <div className="mt-4 flex-col justify-between">
                      <div className="flex flex-row justify-between">
                        <h3 className="text-sm text-gray-700 dark:text-gray-300 uppercase max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {product.name}
                        </h3>
                        {product.colors && (
                          <div className="flex gap-x-8 items-center">
                            <div className="flex gap-x-1">
                              {product.colors.map((color: any, index: any) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full border border-black dark:border-gray-300 cursor-pointer"
                                  style={{ backgroundColor: color }}
                                  title={color} // Display hex code as a tooltip
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {product.salePercent ? (
                            <div className="flex flex-row gap-x-3">
                              <span className="line-through text-gray-500 dark:text-gray-400">
                                PKR {Math.round(product.price)}
                              </span>{" "}
                              <div className="bg-yellow-300 dark:bg-yellow-600 flex flex-row px-2 gap-x-3">
                                <span className="text-black dark:text-white">
                                  PKR {discountedPrice}
                                </span>
                                {product.salePercent && (
                                  <p className="text-black dark:text-white">
                                    -{product.salePercent}%
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : (
                            <span>PKR {Math.round(product.price)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotItems;
