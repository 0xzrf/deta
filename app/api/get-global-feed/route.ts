import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/utils"

export const GET = async (req: NextRequest) => {

    const globalFeed = await prisma.global.findMany()

    return NextResponse.json({
        success: true,
        globalFeed,
        msg: "successfully got the global feed"
    })

}