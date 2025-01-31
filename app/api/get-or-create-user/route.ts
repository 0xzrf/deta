import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/utils"

export const POST = async (req: NextRequest) => {

    const {walletAddress} = await req.json(); 

    if (!walletAddress) {
        return NextResponse.json({
            success: false,
            msg: "Please send the walletAddress"
        })
    }

    let user = await prisma.user.findUnique({
        where: {
            address: walletAddress
        }
    })


    if (!user) {

        user = await prisma.user.create({
            data: {
                address: walletAddress
            }
        })

    }

    return NextResponse.json({
        success: true,
        user,
        msg: "successfully got the user information"
    })

}