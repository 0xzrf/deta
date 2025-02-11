import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/utils"

export const POST = async (req: NextRequest) => {

    const {walletAddress, bonus} : {walletAddress: string, bonus: boolean} = await req.json(); 

    if (!walletAddress) {
        return NextResponse.json({
            success: false,
            msg: "Please send the walletAddress"
        })
    }

    await prisma.user.update({
        where: {
            address: walletAddress
        },
        data: {
            bonus_claimed: bonus
        }
    })

    return NextResponse.json({
        success: true,
        msg: "Bonus updated"
    })
  
}