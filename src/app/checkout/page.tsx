"use client";

import { useState } from "react";
import {
  ChevronRight,
  CreditCard,
  Truck,
  User,
  DollarSign,
  CurrencyIcon as CashIcon,
} from "lucide-react";

export default function CheckoutPage() {
  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 transform -skew-x-6">
          Checkout
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Personal Details Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:skew-x-1 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <User className="mr-2" />
                Personal Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="First Name"
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="Last Name"
                  required
                />
                <input
                  className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  type="email"
                  placeholder="Email"
                  required
                />
                <input
                  className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  type="tel"
                  placeholder="Phone"
                  required
                />
              </div>
            </section>

            {/* Delivery Address Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:-skew-x-1 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Truck className="mr-2" />
                Delivery Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="Street Address"
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="City"
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="State/Province"
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="ZIP/Postal Code"
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="Country"
                  required
                />
              </div>
            </section>

            {/* Billing Address Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:skew-x-1 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2" />
                Billing Address
              </h2>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={sameAsDelivery}
                    onChange={(e) => setSameAsDelivery(e.target.checked)}
                  />
                  Same as delivery address
                </label>
              </div>
              {!sameAsDelivery && (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="Street Address"
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="City"
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="State/Province"
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="ZIP/Postal Code"
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="Country"
                    required
                  />
                </div>
              )}
            </section>

            {/* Payment Options Section */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:-skew-x-1 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <DollarSign className="mr-2" />
                Payment Options
              </h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  <span className="flex items-center">
                    <CashIcon className="mr-2" />
                    Cash on Delivery (COD)
                  </span>
                </label>
                {/* Add more payment options here in the future */}
              </div>
            </section>
          </div>

          {/* Order Summary Section */}
          <div className="md:col-span-1">
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:-skew-x-1 transition-transform duration-300 sticky top-4">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$99.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$9.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$10.00</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>$119.98</span>
                </div>
              </div>
              <button className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-4 mt-6 rounded transform hover:skew-x-2 transition-all duration-300 flex items-center justify-center">
                Place Order
                <ChevronRight className="ml-2" />
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
