//need to create register route standalone cause someone think who 
//needs register route in NextAuth

import { connToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    try {
        const { email, password } = await request.json()

        if(!email || !password){
            return NextResponse.json(
                {error:"email and password are requried"},
                {status:400}
            )
        }

        await connToDB()

        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error:"User already registered"},
                {status:400}
            )
        }

        const user = await User.create({
            email,
            password
        })

        return NextResponse.json(
                {message:"User registered successfully",user},
                {status:200}
            )
    } catch (error) {
        console.log("user registrartion error", error);
        return NextResponse.json(
                {error:"failed to registerd user",},
                {status:400}
            )
    }
}