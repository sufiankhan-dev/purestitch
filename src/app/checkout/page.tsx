"use client";

import { useEffect, useState } from "react";
import {
  ChevronRight,
  CreditCard,
  Truck,
  User,
  DollarSign,
  CurrencyIcon as CashIcon,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { Toast } from "@/components/ui/toast";
import { toast } from "@/components/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  currency: string;
  description: string;
  formattedPrice: string;
  formattedValue: string;
  image: string;
  name: string;
  price: number;
  productId: number;
  quantity: number;
  value: number;
  selectedSize: any;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const [sameAsDelivery, setSameAsDelivery] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartData, setCartData] = useState<Record<string, CartItem>>({});
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  const SHIPPING_CHARGE = 250;

  const calculateTotal = () => {
    const subtotal = Object.values(cartData).reduce(
      (total, item) => total + item.value,
      0
    );
    return subtotal + SHIPPING_CHARGE;
  };

  const calculateSubtotal = () => {
    return Object.values(cartData).reduce(
      (total, item) => total + item.value,
      0
    );
  };

  const calculateShippingTotal = () => {
    return SHIPPING_CHARGE;
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    const validateSection = (
      section: Record<string, string>,
      sectionName: string
    ) => {
      Object.entries(section).forEach(([field, value]) => {
        if (!value.trim()) {
          newErrors[`${sectionName}.${field}`] =
            `Please fill the ${field} field`;
        }
      });
    };

    validateSection(personalDetails, "personalDetails");
    validateSection(deliveryAddress, "deliveryAddress");
    if (!sameAsDelivery) {
      validateSection(billingAddress, "billingAddress");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    if (!validateFields()) {
      toast({
        title: "Pls fill out all the fields!",
        className: "bg-black text-white",
      });
      setLoading(false);
      return;
    }

    const orderData = {
      orderId: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      personalDetails,
      deliveryAddress,
      billingAddress: sameAsDelivery ? deliveryAddress : billingAddress,
      paymentMethod,
      cartItems: Object.values(cartData),
      totalAmount: calculateTotal(),
    };

    console.log(orderData);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data after success", orderData);
        console.log("Order Id:", orderData.orderId);

        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        setOrderId(orderData.orderId);
        console.log("Order placed successfully!");
        clearCart();
        localStorage.removeItem("cartData");
        setShowSuccessDialog(true);
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast({ title: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const renderError = (fieldKey: string) => {
    return errors[fieldKey] ? (
      <p className="text-red-500 text-sm">{errors[fieldKey]}</p>
    ) : null;
  };

  const handleContinueToSummary = () => {
    setShowSuccessDialog(false);
    router.push(`/order-summary/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-4 md:p-8">
      <Dialog open={showSuccessDialog} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg mb-4">Thank you for shopping with us!</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Your order has been placed and is being processed. You will
              receive a confirmation email shortly.
            </p>
            <p className="text-sm font-semibold mb-2">Order ID: {orderId}</p>
            <Button
              onClick={handleContinueToSummary}
              className="w-full bg-black text-white dark:bg-white dark:text-black font-bold py-3 px-4 rounded transition-all duration-300 hover:bg-opacity-90"
            >
              Continue to Order Summary
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
                  value={personalDetails.firstName}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      firstName: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="Last Name"
                  value={personalDetails.lastName}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  type="email"
                  placeholder="Email"
                  value={personalDetails.email}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      email: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  type="tel"
                  placeholder="Phone"
                  value={personalDetails.phone}
                  onChange={(e) =>
                    setPersonalDetails({
                      ...personalDetails,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform hover:-skew-x-1 transition-transform duration-300">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Truck className="mr-2" />
                Delivery Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="col-span-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="Street Address"
                  value={deliveryAddress.street}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      street: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="City"
                  value={deliveryAddress.city}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      city: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="State/Province"
                  value={deliveryAddress.state}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      state: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="ZIP/Postal Code"
                  value={deliveryAddress.zip}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      zip: e.target.value,
                    })
                  }
                  required
                />
                <input
                  className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                  placeholder="Country"
                  value={deliveryAddress.country}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliveryAddress,
                      country: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </section>

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
                    value={billingAddress.street}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...billingAddress,
                        street: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="City"
                    value={billingAddress.city}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...billingAddress,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="State/Province"
                    value={billingAddress.state}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...billingAddress,
                        state: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="ZIP/Postal Code"
                    value={billingAddress.zip}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...billingAddress,
                        zip: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    className="col-span-2 md:col-span-1 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
                    placeholder="Country"
                    value={billingAddress.country}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...billingAddress,
                        country: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}
            </section>

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
                    Cash on Delivery (COD)
                  </span>
                </label>
              </div>
            </section>
          </div>

          <div className="md:col-span-1">
            <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-4">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {Object.values(cartData).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="mr-2 rounded object-cover w-14 h-14"
                      />
                      <div>
                        <p className="font-semibold line-clamp-1">
                          {item.name}
                        </p>
                        <div className="flex flex-row gap-x-3 items-center">
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            Size: {item.selectedSize}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="text-nowrap">
                      PKR {Math.round(item.price)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-300 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {cartData[Object.keys(cartData)[0]]?.currency}{" "}
                      {Math.round(calculateSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {cartData[Object.keys(cartData)[0]]?.currency}{" "}
                      {Math.round(calculateShippingTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-3">
                    <span>Total</span>
                    <span>
                      {cartData[Object.keys(cartData)[0]]?.currency}{" "}
                      {Math.round(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className={`w-full ${loading ? "bg-gray-500" : "bg-black dark:bg-white"} text-white dark:text-black font-bold py-3 px-4 mt-6 rounded transform hover:skew-x-2 transition-all duration-300 flex items-center justify-center`}
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    Place Order
                    <ChevronRight className="ml-2" />
                  </>
                )}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
