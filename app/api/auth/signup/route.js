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
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or username already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await UserModel.create({
      username,
      email,
      password,
      role: "user"
    });

    const token = generateToken(newUser);
    return NextResponse.json(
      { success: true, token, role: "user" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 500 }
    );
  }
}