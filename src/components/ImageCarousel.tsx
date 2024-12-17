"use client";

import React, { useState } from "react";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";

interface ImageProps {
  image: any;
}

const ImageCarousel = ({ image }: ImageProps) => {
  const [bigImage, setBigImage] = useState(image[0]);

  const handleClick = (image: any) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {image.map((image: any, index: any) => (
          <div
            key={index}
            className="overflow-hidden rounded-md bg-gray-100 max-w-xs max-h-32"
          >
            {/* Image Tag */}
            <Image
              src={urlForImage(image)}
              width={200}
              height={200}
              alt="Product Images"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-none bg-gray-100 lg:col-span-4 max-h-[500px]">
        <Image
          src={urlForImage(bigImage)}
          alt="Product Main Image"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ImageCarousel;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { urlForImage } from "../../sanity/lib/image";

// interface ImageProps {
//   image: any[];
// }

// const ImageCarousel = ({ image }: ImageProps) => {
//   const [bigImage, setBigImage] = useState(image[0]);

//   const handleClick = (img: any) => {
//     setBigImage(img);
//   };

//   return (
//     <div className="grid gap-4 lg:grid-cols-5">
//       <div className="order-last flex gap-4 lg:order-none lg:flex-col">
//         {image.map((img: any, index: number) => (
//           <div
//             key={index}
//             className={`overflow-hidden rounded-lg bg-gray-100 ${
//               img === bigImage ? "ring-2 ring-black" : ""
//             }`}
//           >
//             <Image
//               src={urlForImage(img)}
//               width={150}
//               height={150}
//               alt={`Product image ${index + 1}`}
//               className="h-full w-full object-cover object-center cursor-pointer"
//               onClick={() => handleClick(img)}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4 max-h-[800px]">
//         <Image
//           src={urlForImage(bigImage)}
//           alt="Main product image"
//           width={800}
//           height={800}
//           className="h-full w-full object-cover object-center"
//         />
//       </div>
//     </div>
//   );
// };

// export default ImageCarousel;
