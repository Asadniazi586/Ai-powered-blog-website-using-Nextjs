import { connectDB } from "@/app/lib/config/db";
import EmailModel from "@/app/lib/config/models/EmailModel";
import { NextResponse } from "next/server";

const loadDB = async ()=>{
    await connectDB();
}
loadDB()
export async function POST(request) {
    const formdata = await request.formData();
    const emailData = {
        email: `${formdata.get('email')}`,
    }
    await EmailModel.create(emailData);
    return NextResponse.json({success:true, msg: "Email subscribed successfully" })
}

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({success:true,emails})
}

export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get('id');
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true, msg: "Email deleted successfully" })

}