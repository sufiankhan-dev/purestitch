"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { Loader } from "@/components/Loader";

interface OrderSummary {
  _id: any;
  orderId: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  cartItems: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    selectedSize: string;
    productId: number;
  }[];
  totalAmount: number;
}

export default function OrderSummaryPage({
  params,
}: {
  params: { orderId: string };
}) {
  const router = useRouter();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await fetch(`/api/order/${params.orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrderSummary(data);
        } else {
          console.error("Failed to fetch order summary");
        }
      } catch (error) {
        console.error("Error fetching order summary:", error);
      }
    };

    fetchOrderSummary();
  }, [params.orderId]);

  const generatePDF = () => {
    if (!orderSummary) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Summary", 105, 15, { align: "center" });
    doc.setFontSize(12);

    doc.text(`Order ID: ${orderSummary.orderId}`, 20, 30);
    doc.text(
      `Name: ${orderSummary.personalDetails.firstName} ${orderSummary.personalDetails.lastName}`,
      20,
      40
    );
    doc.text(`Email: ${orderSummary.personalDetails.email}`, 20, 50);
    doc.text(`Phone: ${orderSummary.personalDetails.phone}`, 20, 60);

    doc.text("Delivery Address:", 20, 75);
    doc.text(`${orderSummary.deliveryAddress.street}`, 20, 85);
    doc.text(
      `${orderSummary.deliveryAddress.city}, ${orderSummary.deliveryAddress.state} ${orderSummary.deliveryAddress.zip}`,
      20,
      95
    );
    doc.text(`${orderSummary.deliveryAddress.country}`, 20, 105);

    doc.text("Items:", 20, 120);
    let yPos = 130;
    orderSummary.cartItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - ID: ${item.productId} - Size: ${item.selectedSize} - Quantity: ${item.quantity} - Price: PKR ${Math.round(item.price)}`,
        20,
        yPos
      );
      yPos += 10;
    });

    doc.text(
      `Total Amount: PKR ${Math.round(orderSummary.totalAmount)}`,
      20,
      yPos + 10
    );

    doc.setFont("helvetica", "bold");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos + 30);
    doc.setFont("helvetica", "normal");

    // Additional information
    yPos += 50;
    doc.text("Additional Information:", 20, yPos);
    yPos += 10;
    doc.text("• You will receive your order in 2-3 working days.", 20, yPos);
    yPos += 10;
    doc.text(
      "• For any questions, contact us at purefit.pk@gmail.com",
      20,
      yPos
    );
    yPos += 10;
    doc.text("• Thank you for shopping with us!", 20, yPos);

    doc.save(`order_summary_${orderSummary._id}.pdf`);
  };

  if (!orderSummary) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
            <p>
              {orderSummary.personalDetails.firstName}{" "}
              {orderSummary.personalDetails.lastName}
            </p>
            <p>{orderSummary.personalDetails.email}</p>
            <p>{orderSummary.personalDetails.phone}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
            <p>{orderSummary.deliveryAddress.street}</p>
            <p>
              {orderSummary.deliveryAddress.city},{" "}
              {orderSummary.deliveryAddress.state}{" "}
              {orderSummary.deliveryAddress.zip}
            </p>
            <p>{orderSummary.deliveryAddress.country}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="text-left py-2 px-3">Item</th>
                  <th className="text-left py-2 px-3">Product ID</th>
                  <th className="text-left py-2 px-3">Size</th>
                  <th className="text-left py-2 px-3">Quantity</th>
                  <th className="text-right py-2 px-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderSummary?.cartItems?.map((item) => (
                  <tr key={item.id} className="border-b dark:border-gray-700">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">{item.productId}</td>
                    <td className="py-2 px-3">{item.selectedSize}</td>
                    <td className="py-2 px-3">{item.quantity}</td>
                    <td className="text-right py-2 px-3">
                      PKR {Math.round(item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold">
                  <td colSpan={3} className="text-right py-4 px-3">
                    Total:
                  </td>
                  <td className="text-right py-4 px-3">
                    PKR {Math.round(orderSummary.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You will receive your order in 2-3 working days.</li>
            <li>
              For any questions, please contact us at purefit.pk@gmail.com
            </li>
            <li>Thank you for shopping with us!</li>
          </ul>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Button onClick={generatePDF} className="w-full sm:w-auto">
            Download PDF
          </Button>
          <Button onClick={() => router.push("/")} className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
