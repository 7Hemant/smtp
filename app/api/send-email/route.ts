// app/api/send-email/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    // Configure your SMTP transporter
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "api", // Replace with your SMTP email
        pass: "e2ec884eba2f7e329385159ac8dee655", // Replace with your SMTP password
      },
    });

    // Email options
    const mailOptions = {
      from: "studentrk7@gmail.com",
      to: "hemantmourya127@gmail.com",
      subject: "New Contact Form smtp",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
