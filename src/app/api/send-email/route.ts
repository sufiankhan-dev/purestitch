import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      personalDetails,
      deliveryAddress,
      cartItems,
      totalAmount,
      orderId,
    } = await req.json();

    // Configure Nodemailer with SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use SMTP host like "smtp.gmail.com"
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password or email password
      },
    });

    // Prepare email content
    const orderSummary = cartItems
      .map(
        (item: any) =>
          `<li style="margin-bottom: 10px;">
            <strong>Name:</strong> ${item.name} <br />
            <strong>Product ID:</strong> ${item.productId} <br />
            <strong>Size:</strong> ${item.selectedSize} <br />
            <strong>Quantity:</strong> ${item.quantity} <br />
            <strong>Price:</strong> ${Math.round(item.price)}
            </li>`
      )
      .join("");

    const userMailOptions = {
      from: "PureFit <no-reply@purefit.com>",
      to: personalDetails.email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Thank you for your order, ${personalDetails.firstName} ${personalDetails.lastName}!</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <ul>${orderSummary}</ul>

        <p>Delievery Charges: PKR 250

        <p><strong>Total Amount:</strong> PKR ${Math.round(totalAmount)}</p>


        <p>You will receive your order into 2 to 3 working days!</p>
        <p>For any queries contact us: 0336-2396337<p>
      `,
    };

    const adminMailOptions = {
      from: "PureFit <no-reply@purefit.com>",
      to: "amashelahi955@gmail.com",
      subject: "New Order Received",
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Customer:</strong> ${personalDetails.firstName} ${personalDetails.lastName}</p>
        <p><strong>Email:</strong> ${personalDetails.email}</p>
        <p><strong>Phone:</strong> ${personalDetails.phone}</p>
        <p><strong>Address:</strong> ${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.country}</p>
        <ul>${orderSummary}</ul>
        <p><strong>Total Amount:</strong> ${Math.round(totalAmount)}</p>
      `,
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
