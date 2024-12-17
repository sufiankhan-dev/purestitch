import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const {
      personalDetails,
      deliveryAddress,
      billingAddress,
      paymentMethod,
      cartItems,
      totalAmount,
      orderId,
    } = await req.json();

    if (
      !personalDetails ||
      !deliveryAddress ||
      !billingAddress ||
      !paymentMethod ||
      !cartItems ||
      !totalAmount ||
      !orderId
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");

    const newOrder = {
      orderId,
      personalDetails,
      deliveryAddress,
      billingAddress,
      paymentMethod,
      cartItems,
      totalAmount,
      createdAt: new Date(),
    };

    await ordersCollection.insertOne(newOrder);

    return NextResponse.json(
      { message: "Order placed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const ordersCollection = db.collection("orders");

    const orders = await ordersCollection.find({}).toArray();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
