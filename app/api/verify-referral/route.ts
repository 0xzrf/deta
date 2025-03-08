import { NextResponse } from "next/server";
import {prisma} from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { referralCode, walletAddress } = await req.json();

    if (!referralCode || !walletAddress) {
      return NextResponse.json({ success: false });
    }


    
    // Check if referral code exists and is unused
    const referral = await prisma.waitlist.findUnique({
      where: {
        referral_code: referralCode,
        used: false,
      },
    });

    // If referral code not found or already used
    if (!referralCode) {
      return NextResponse.json({ success: false });
    }

    // Update user verification status and mark referral as used
    await prisma.$transaction([
      // Update user verified status
      prisma.user.update({
        where: { address: walletAddress },
        data: { verified: true },
      }),
      // Mark referral code as used
      prisma.waitlist.update({
        where: { referral_code: referral.referral_code },
        data: { used: true },
      }),
    ]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error verifying referral:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
