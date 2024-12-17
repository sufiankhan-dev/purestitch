import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Invalid order ID format" },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("orders");

    const order = await collection.findOne({ orderId: id });

    if (order) {
      return NextResponse.json(order);
    } else {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching Order:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching the Order",
      },
      { status: 500 }
    );
  }
}
