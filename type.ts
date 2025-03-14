export interface simplifiedProduct {
  _id: string;
  imageUrl: string;
  price: number;
  productId: number;
  categoryName: string;
  name: string;
  salePercent: number;
  colors: any;
}

// full products type
export interface fullProductData {
  _id: string;
  image: any;
  productId: number;
  price: number;
  categoryName: string;
  name: string;
  description: string;
  price_id: string;
  compositionAndCare: string[];
  collectionSlug: string;
  colors: any;
  sizes: any;
  salePercent: number;
  fit: string;
}

export interface DeliveryAndReturnData {
  deliveries: string[];
  returns: string[];
}

export interface HeroImages {
  image1: any;
  image2: any;
  image3: any;
}

export interface CategoriesItems {
  Mensdata: any;
  Womensdata: any;
  Kidsdata: any;
}

export interface CollectionsData {
  _id: string;
  imageUrl: string;
  price: number;
  productId: number;
  categoryName: string;
  name: string;
  collectionName: string;
  salePercent: number;
  colors: any;
}
