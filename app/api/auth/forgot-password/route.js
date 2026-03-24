import { connectDB } from "@/app/lib/config/db";
import UserModel from "@/app/lib/config/models/UserModel";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // ✅ ADD THIS

const loadDB = async () => {
  await connectDB();
};
loadDB();

export async function POST(request) {
  try {
    const { email } = await request.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Save token + expiry (1 hour)
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    // ✅ CREATE TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // ✅ SEND EMAIL
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `
        <h3>Password Reset</h3>
        <p>You requested to reset your password.</p>
        <p>Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    return NextResponse.json(
      { message: "Password reset link sent to your email" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}