import { NextRequest, NextResponse } from "next/server";
import { clusterApiUrl, PublicKey, Connection, Keypair } from "@solana/web3.js";
import { AnchorProvider, Program, BN, Wallet } from "@coral-xyz/anchor";
import bs58 from "bs58";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import idl from "./idl.json";
import { Deta } from "./deta";
import { PRIVATE_KEY } from "./util";

const idlJson = JSON.parse(JSON.stringify(idl));

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const wallet = new Wallet(
  Keypair.fromSecretKey(new Uint8Array(bs58.decode(PRIVATE_KEY)))
);

const provider = new AnchorProvider(connection, wallet, {});

const program = new Program<Deta>(idlJson, provider);

export async function POST(req: NextRequest) {
  try {
    const { contributorKey } = await req.json();
    const reward = 1;

    if (!reward || !contributorKey) {
      return NextResponse.json(
        { error: "Insufficient information provided" },
        { status: 400 }
      );
    }

    const mint = new PublicKey(
      "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
    );
    const contributor = new PublicKey(contributorKey);
    const contributorAta = await getTokenAccount(contributorKey, mint.toBase58());
    const detaWallet = await getTokenAccount(wallet.publicKey.toBase58(), mint.toBase58());

    console.log("contributorAta", contributorAta);
    console.log("detaWallet", detaWallet);

    await program.methods
      .rewardDistribute(new BN(reward * 10 ** 6))
      .accountsStrict({
        admin: wallet.publicKey,
        mint,
        contributor: contributor,
        contributorAta: new PublicKey(contributorAta?.address as string),
        detaWallet: new PublicKey(detaWallet?.address as string),
        associatedTokenProgram: new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),
        tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        systemProgram: new PublicKey("11111111111111111111111111111111"),
      })
      .signers([wallet.payer])
      .rpc();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// Function to get associated token account
async function getTokenAccount(walletAddress: string, mintAddress: string) {
  const ownerPublicKey = new PublicKey(walletAddress);
  const mintPublicKey = new PublicKey(mintAddress);

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
    programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
  });

  const existingAccount = tokenAccounts.value.find(
    (account) => account.account.data.parsed.info.mint === mintPublicKey.toBase58()
  );

  if (existingAccount) {
    return {
      address: existingAccount.pubkey.toBase58(),
      amount: existingAccount.account.data.parsed.info.tokenAmount.uiAmountString,
    };
  }

  const expectedTokenAccount = await getAssociatedTokenAddress(mintPublicKey, ownerPublicKey);

  return {
    address: expectedTokenAccount.toBase58(),
    amount: "0",
  };
}
