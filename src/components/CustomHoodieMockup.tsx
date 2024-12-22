import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function CustomHoodiePromo() {
  return (
    <section className="py-24 bg-white dark:bg-[#020817]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Create Your Own Custom Hoodie
            </h2>
            <p className="mt-3 text-lg text-gray-500 dark:text-gray-300">
              Have a unique design in mind? We'll bring it to life! Share your
              ideas with us, and we'll create a one-of-a-kind hoodie just for
              you.
            </p>
            <div className="mt-8 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
              {/* <Link>
              <Button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800  ">
                <MessageCircle className="mr-2 h-5 w-5" />
                Share on WhatsApp
              </Button>
              </Link>
              <Button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-300">
                <Instagram className="mr-2 h-5 w-5" />
                Share on Instagram
              </Button> */}
              <Link
                href="https://www.instagram.com/purefit.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-300">
                  <Instagram className="mr-2 h-5 w-5" />
                  Share on Instagram
                </Button>
              </Link>
              <Link
                href="https://wa.me/+923362396337"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-300">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Share on WhatsApp
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 relative ">
            <Image
              src="/custom.jpg"
              alt="Custom Hoodie Mockup"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover object-center max-w-[100%] max-h-[500px]"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply opacity-20 rounded-lg"></div> */}
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-base text-gray-500 dark:text-gray-300">
            Our team of designers will work with you to perfect your custom
            hoodie. Quality materials, expert craftsmanship, and your unique
            style - the perfect combination!
          </p>
        </div>
      </div>
    </section>
  );
}
