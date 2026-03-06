import { connectDB } from "@/app/lib/config/db";
import UserModel from "@/app/lib/config/models/UserModel";
import { generateToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};
loadDB();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check if admin credentials match
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Create or find admin user
      let adminUser = await UserModel.findOne({ email });
      if (!adminUser) {
        adminUser = await UserModel.create({
          username: "admin",
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD, // This will be hashed by the pre-save hook
          role: "admin"
        });
      }

      const token = generateToken(adminUser);
      return NextResponse.json(
        { success: true, token, role: "admin" },
        { status: 200 }
      );
    }

    // Regular user login
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = generateToken(user);
    return NextResponse.json(
      { success: true, token, role: user.role },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}