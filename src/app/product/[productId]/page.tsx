import ProductDetails from "@/components/ProductDetails";
import { client } from "../../../../sanity/lib/client";
import ImageCarousel from "../../../components/ImageCarousel";
import RelatedProducts from "@/components/RelatedProducts";

async function getData(productId: string) {
  const query = `*[_type == 'product' && productId == ${parseInt(productId)}][0]{
    _id,
    image,
    price,
    name,
    productId,
    description,
    compositionAndCare,
    "categoryName": category->name,
    collectionSlug,
    price_id,
    sizes,
    colors,
    salePercent,
    fit
  }`;
  return await client.fetch(query);
}

async function getRelatedProducts(
  categoryName: string,
  currentProductId: string,
  collectionSlug: string
) {
  const query = `*[_type == 'product' && category->name == "${categoryName}" && productId != ${parseInt(currentProductId)} && collectionSlug == "${collectionSlug}"]{
    _id,
    name,
    price,
    "imageUrl": image[0].asset->url,
    productId,
    collectionSlug,
    salePercent,
    colors
  }`;
  return await client.fetch(query);
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const data = await getData(params.productId);

  if (!data) {
    return <div>Product not found</div>;
  }

  const relatedProducts = await getRelatedProducts(
    data.categoryName,
    params.productId,
    data.collectionSlug
  );

  return (
    <div className="container mx-auto px-5 py-2 lg:px-10 lg:pt-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row w-full lg:h-full lg:gap-8">
          <div className="flex lg:w-[55%] sm:w-full mb-5">
            <ImageCarousel image={data.image} />
          </div>
          <div className="lg:w-[45%]">
            <ProductDetails data={data} />
          </div>
        </div>
        <div className="mt-20 mb-20">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
