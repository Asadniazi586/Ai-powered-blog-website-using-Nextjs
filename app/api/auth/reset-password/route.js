import { connectDB } from "@/app/lib/config/db";
import UserModel from "@/app/lib/config/models/UserModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};
loadDB();

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Update password
    user.password = password;

    // Clear reset fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}