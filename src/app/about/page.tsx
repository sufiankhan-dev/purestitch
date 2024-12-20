import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10 pointer-events-none">
        <Image
          src="/logo.png" // Replace with your actual logo path
          alt="PureFit Logo"
          width={600}
          height={600}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            About PureFit
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Elevating your style with custom hoodies and premium t-shirts.
          </p>
        </div>

        <div className="mt-16 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Story
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Founded in 2024, PureFit was born from a passion for comfortable,
              stylish, and personalized clothing. Our journey began when a group
              of fashion enthusiasts recognized the need for high-quality custom
              hoodies and t-shirts that truly reflect individual style and
              personality.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              At PureFit, our mission is to provide customers with the highest
              quality custom hoodies and t-shirts that not only look great but
              feel amazing too. We believe that clothing is a form of
              self-expression, and our goal is to help you create pieces that
              truly represent who you are.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Values
            </h2>
            <ul className="mt-3 list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>
                Quality: We use premium materials to ensure comfort, durability,
                and longevity in every garment.
              </li>
              <li>
                Customization: We offer extensive personalization options to
                make each piece uniquely yours.
              </li>
              <li>
                Sustainability: We are committed to eco-friendly practices in
                our production and packaging.
              </li>
              <li>
                Customer Satisfaction: We strive to exceed expectations with our
                products and service.
              </li>
            </ul>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Products
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              PureFit specializes in two main product lines:
            </p>
            <ul className="mt-3 list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>
                Custom Hoodies: Cozy, stylish, and perfectly tailored to your
                design preferences.
              </li>
              <li>
                Premium T-Shirts: High-quality tees that offer both comfort and
                durability for everyday wear.
              </li>
            </ul>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Each item is crafted with attention to detail, ensuring that you
              receive a product that you'll love to wear time and time again.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href={"/"}>
            <Button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
