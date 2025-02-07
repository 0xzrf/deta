import Together from "together-ai";
import { env } from "@/env";
import type { Category } from "@/server/schemas/qa";

type ModelDecision = "approved" | "rejected";

interface ModelResponse {
  name: string;
  decision: ModelDecision;
  qualityRating?: number;
  category: Category;
  rawResponse: string | null;
}

interface ClassificationResult {
  finalDecision: ModelDecision;
  finalCategory: Category;
  modelResponses: ModelResponse[];
}

export class RewardCalculator {
  
  private static STAGE_MAP: Record<string, number> = {
    "beta-v1": 500,
    "beta-v2": 425,
    "stage-1": 361,
    "stage-2": 307,
    "stage-3": 261,
    "stage-4": 222,
    "stage-5": 189,
    "stage-6": 161,
    "stage-7": 137,
    "stage-8": 116,
  };

  static calculateCategoryMultiplier(category: Category): number {
    const incentiveCategories: Category[] = [
      "Development",
      "DeFi",
      "Smart Contracts",
      "Layer 2",
      "Cross-Chain",
      "Privacy",
      "Consensus",
      "Scalability"
    ];
    return incentiveCategories.includes(category) ? 2.5 : 1;
  }

  static getBaseReward(stage: string): number {
    return this.STAGE_MAP[stage] || 0;
  }

  static calculateQualityMultiplier(rating: number): number {
    return 0.6 + (Math.min(10, Math.max(1, rating)) - 1) * 0.1;
  }

  static calculateApprovalMultiplier(approvalRate: number): number {
    const normalized = (Math.min(100, Math.max(0, approvalRate)) - 50) / 50;
    return 1 + Math.pow(normalized, 2) * 0.5;
  }
}

export class QAClassifier {
  private client = new Together({ apiKey: env.TOGETHER_API });
  private classificationCache = new Map<
    string,
    { finalDecision: ModelDecision; finalCategory: Category }
  >();

  async classify(qa: {
    question: string;
    answer: string;
  }): Promise<ClassificationResult> {
    const cacheKey = `${qa.question}:${qa.answer}`;
    if (this.classificationCache.has(cacheKey)) {
      const cached = this.classificationCache.get(cacheKey)!;
      return { ...cached, modelResponses: [] };
    }

    const { cleanQuestion, cleanAnswer } = this.preprocessInput(qa);
    const result = await this.parallelModelAnalysis(cleanQuestion, cleanAnswer);

    this.classificationCache.set(cacheKey, {
      finalDecision: result.finalDecision,
      finalCategory: result.finalCategory,
    });
    return result;
  }

  private preprocessInput(qa: { question: string; answer: string }) {
    return {
      cleanQuestion: qa.question.trim().replace(/[^\w\s\-./():"'#%=@$]/gi, ""),
      cleanAnswer: qa.answer.trim().replace(/[^\w\s\-./():"'#%=@$]/gi, ""),
    };
  }

  private parseModelResponse(raw: string): {
    decision: ModelDecision;
    qualityRating?: number;
    category: Category;
  } {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      raw = jsonMatch[0];
    }

    const allowedCategories: Category[] = [
      "Development",
      "DeFi",
      "NFT",
      "General",
      "Security",
      "Economics",
      "Governance",
      "Scalability",
      "Interoperability",
      "Privacy",
      "Consensus",
      "Smart Contracts",
      "Wallets",
      "DAOs",
      "Layer 2",
      "Cross-Chain",
    ];

    let cleaned = raw
      .trim()
      .replace(/<(\/)?json>/gi, "")
      .replace(/^```(json)?\s*|\s*```$/g, "")
      .replace(/^[^{[]*|[^}\]]*$/g, "");

    if (!cleaned.endsWith("}") && !cleaned.endsWith('"}')) {
      const lastBrace = cleaned.lastIndexOf("}");
      cleaned = lastBrace > 0 ? cleaned.slice(0, lastBrace + 1) : "{}";
    }

    try {
      const result = JSON.parse(cleaned);
      const decision = result.decision?.toLowerCase()?.startsWith("approved")
        ? "approved"
        : "rejected";
      const qualityRating =
        typeof result.quality_rating === "number"
          ? Math.min(10, Math.max(1, result.quality_rating))
          : undefined;
      const rawCategory = result.category?.trim() || "General";
      const category = allowedCategories.includes(rawCategory as Category)
        ? (rawCategory as Category)
        : "General";
      return { decision, qualityRating, category };
    } catch (e) {
      console.error("Failed to parse JSON response:", { raw, cleaned });
      const decisionMatch = raw.match(/"decision"\s*:\s*"(\w+)"/i);
      const decision = decisionMatch?.[1]?.toLowerCase()?.startsWith("approved")
        ? "approved"
        : "rejected";
      return { decision, category: "General" };
    }
  }

  private async parallelModelAnalysis(
    question: string,
    answer: string
  ): Promise<ClassificationResult> {
    const prompt = `
<Web3 QA Validation Protocol>
Analyze this QA pair for substantive content relevant to blockchain technology or Solana:

**Content Classification Framework**:
1. BASIC CONTENT (Approved when educational):
- Explains technical concepts (even basic-intermediate ones) or fundamental concepts required to understand blockchain/Solana
- Compares technologies/methods
- References legitimate projects/tools
- Provides educational value
- Contains accurate fundamental knowledge
- Covers security practices, wallet management, or economic basics
- Answers "what" and "why" questions for newcomers

- Examples: 
  - "Wallet security fundamentals."
  - "Transaction lifecycle explanation."
  - "Consensus mechanism comparisons."
  - "Key management best practices."
  - "How do crypto wallets store private keys securely?"
  - "What's the difference between coins and tokens?"
  - "Why do blockchains need consensus mechanisms?"
  - "How to safely store seed phrases?"
  - "What makes Solana's transaction speed different from Ethereum?"

2. TECHNICAL CONTENT (Approved when substantive):
- Details protocol implementations, cryptographic primitives, or system architecture
- Explains "how" systems work with specific mechanisms/parameters
- Compares engineering approaches or optimization techniques
- Includes code-level concepts, SDK usage, or protocol specifications

- Examples:
  - Solana's Sealevel parallel execution details
  - SPL token metadata extensions implementation
  - ZK-proof construction for privacy pools
  - BPF loader mechanics for program upgrades
  - "SPL tokens use mint authority to control supply creation"
  - "ERC-721 tracks NFT ownership through token IDs"
  - "Solana's Tower BFT uses PoH as cryptographic clock"
  - "ZK rollups batch transactions using validity proofs"
  - "How does Solana's Sealevel runtime enable parallel transaction processing?"
  - "BPF loader in Solana allows on-chain program upgrades through buffer accounts"
  - "Jito-Solana client reduces validator memory usage via trimmed account sets"
  - "Compressed NFTs use concurrent Merkle trees for parallel updates"
  - "SPL token-2022's transfer hook interface enables custom logic execution"
  - "Anchor framework's IDL automates client-side type generation"
  - "SVM's Berkeley Packet Filter prevents reentrancy attacks by design"
  - "Solana's QUIC implementation prioritizes validator traffic during congestion"
  - "Token-2022's interest bearing tokens implement compounding via transfer fees"
  - "Metaplex's Bubblegum program optimizes NFT compression with hashing tricks"
  - "EIP-4844 proto-danksharding introduces blob transactions for L2 data"
  - "Lightning Network's AMP enables atomic multi-path payments"
  - "Cosmos IBC uses Merkle proofs for cross-chain state verification"
  - "Lido's stSOL implements rebasing through daily exchange rate updates"
  - "ZK-proof recursion enables parallel proof aggregation in Nova circuits"

**APPROVAL CRITERIA**:
✅ Approve Basic Content When:
  - Provides clear educational value for newcomers
  - Explains foundational concepts accurately
  - Helps users avoid common security pitfalls
  - Compares technologies at architectural level

✅ Approve Technical Content When:
  - Contains implementation-specific details
  - References exact protocol versions/parameters
  - Explains cryptographic primitives in context
  - Uses code snipptes to explain some relevant topic
  - Helps with difficult to find technical details
  - Helps troubleshoot issues which are not so easy to do
  - Details tradeoffs in system design choices
  Technical Focus Areas (Beginner-Friendly):
  - Fundamentals: Wallets, keys, transactions
  - Architecture: Nodes, blocks, chains
  - Economics: Gas fees, staking rewards
  - Security: Seed phrases, smart contract audits
  - Use Cases: NFTs, DeFi, identity systems

❌ Reject If:
  - Superficial treatment of complex topics
  - Speculation without technical basis
  - Promotional content masquerading as education
  - Factual inaccuracies in core concepts
  - Vague philosophical discussions without technical anchor

**Category Assignment**:
  Assign the most specific applicable category from:
  - Development: Software dev, tools, SDKs, programming
  - DeFi: Decentralized finance, exchanges, lending
  - NFT: Non-fungible tokens, digital collectibles
  - Security: Wallet security, audits, best practices
  - Economics: Tokenomics, staking, fees
  - General: General blockchain concepts, intros
  - Consensus: PoW, PoS, consensus mechanisms
  - Scalability: Layer 2, throughput optimizations
  - Privacy: ZK-proofs, anonymous transactions
  - Interoperability: Cross-chain protocols, bridges
  - Governance: DAOs, voting, protocol upgrades
  - Wallets: Key management, transaction signing
  - Smart Contracts: Development, deployment
  - DAOs: Decentralized organizations
  - Layer 2: Rollups, state channels
  - Cross-Chain: Multi-chain interoperability

**Validation Examples**:
[Basic/Approved] "How do hardware wallets isolate private keys from internet exposure?"
[Basic/Approved] "What is the purpose of a seed phrase in cryptocurrency wallets?"
[Basic/Approved] "How does a hardware wallet provide better security than software wallets?"
[Basic/Approved] "What are the differences between proof-of-work and proof-of-stake consensus mechanisms?"
[Basic/Approved] "Why do blockchain networks require transaction fees (gas)?"
[Basic/Approved] "What is the difference between a custodial and non-custodial wallet?"
[Basic/Approved] "How can users verify transaction status using a block explorer?"
[Basic/Approved] "What security measures should be taken when creating a crypto wallet?"
[Basic/Approved] "What is the role of validators in maintaining a blockchain network?"
[Basic/Approved] "How do decentralized exchanges (DEXs) eliminate the need for intermediaries?"
[Basic/Approved] "What are the risks of interacting with unaudited smart contracts?"
[Basic/Approved] "Why should users avoid reusing blockchain addresses for privacy?"
[Basic/Approved] "How does multi-signature authentication enhance wallet security?"
[Basic/Approved] "What are the environmental implications of different consensus mechanisms?"
[Basic/Approved] "How do bridge protocols enable cross-chain asset transfers?"
[Basic/Approved] "What are the key differences between fungible and non-fungible tokens?"
[Basic/Rejected] "Which crypto is best for quick profits?"
[Basic/Rejected] "How to become crypto millionaire in 6 months?"
[Basic/Rejected] "Why [Celebrity] coin will revolutionize everything"
[Basic/Rejected] "Best memecoins to buy this week"
[Basic/Rejected] "What crypto will 100x after Bitcoin halving?" (Price speculation)
[Basic/Rejected] "How to bypass KYC on centralized exchanges?" (Illegal circumvention)
[Basic/Rejected] "Which anonymous coin is best for darknet purchases?" (Promotes illegal use)
[Basic/Rejected] "Step-by-step guide to creating a pump-and-dump token." (Manipulative tactics)
[Basic/Rejected] "Why [Influencer] says Dogecoin will replace the dollar." (Celebrity-driven hype)
[Technical/Approved] "Solana's Quic implementation uses stream isolation to prevent network congestion from affecting validator consensus messages"
[Technical/Approved] "Uniswap V3 uses concentrated liquidity positions stored in singleton contracts to reduce gas costs by 90% compared to V2."
[Technical/Approved] "ZkSync Era's LLVM compiler leverages register-based IR to optimize ZK circuit generation for Ethereum L2 rollups."
[Technical/Approved] "Solana's versioned transactions introduce address lookup tables that reduce transaction size by 40% through indirect account references."
[Technical/Approved] "Cosmos SDK's IBC module implements Merkle proof verification using ICS-23 specs for cross-chain state validation."
[Technical/Approved] "AptosBFT 4.0 consensus uses pipelined batch processing with 3-phase commit to achieve 160k TPS in testnet conditions."
[Technical/Rejected] "Ethereum can process 1M TPS with sharding" (inaccurate)
[Technical/Rejected] "Smart contracts can't be hacked" (false)
[Technical/Rejected] "Zero-knowledge proofs break encryption" (misleading)
[Technical/Rejected] "Bitcoin's Lightning Network allows instant transfers because it doesn't use blockchain at all." (Misrepresents layer-2 fundamentals)
[Technical/Rejected] "Polygon zkEVM achieves infinite scalability through quantum-resistant proofs." (Unsubstantiated technical claims)
[Technical/Rejected] "All ERC-20 tokens automatically comply with OFAC regulations through built-in compliance modules." (Factually incorrect)
[Technical/Rejected] "Cardano's Ouroboros protocol enables instant finality with 0 confirmation time." (Contradicts PoS design fundamentals)
[Technical/Rejected] "NEAR Protocol shards automatically merge when load decreases using AI-powered orchestration." (Non-existent technical feature)

Question: ${question}
Answer: ${answer}

Respond with JSON: { "decision": "approved|rejected", "category": "Category" }`;

    const models = [
      { name: "deepseek", model: "deepseek-ai/DeepSeek-R1" },
      { name: "mistral", model: "mistralai/Mistral-7B-Instruct-v0.2" },
      { name: "llama", model: "meta-llama/Llama-3.3-70B-Instruct-Turbo" },
    ];

    const promises = models.map(({ name, model }) =>
      this.client.chat.completions
        .create({
          messages: [
            {
              role: "system",
              content: `You are a Web3 QA reviewer. Analyze implementation-level details. Be strict, fair and pragmatic. Also reward genuine learning attempts while filtering low-quality content. Respond ONLY with valid JSON using format: { "decision": "approved|rejected", "category": "Development|DeFi|NFT|General|..." } - DO NOT include any other text or explanations`,
            },
            { role: "user", content: prompt },
          ],
          model,
          ...(model === "deepseek-ai/DeepSeek-R1"
            ? {}
            : { response_format: { type: "json_object" } }),
          max_tokens: 200,
          temperature: 0.2,
          top_p: 0.95,
        })
        .then((response): ModelResponse => {
          const raw = response?.choices?.[0]?.message?.content?.trim() || "";
          try {
            const parsed = this.parseModelResponse(raw);
            return {
              name,
              decision: parsed.decision,
              category: parsed.category,
              rawResponse: raw,
            };
          } catch (e) {
            console.error(`Error parsing JSON from ${name}:`, e, raw);
            return {
              name,
              decision: "rejected" as const,
              category: "General",
              rawResponse: `PARSE ERROR: ${(e as Error).message} - ${raw}`,
            };
          }
        })
    );

    const responses = await Promise.all(promises);
    const approvedCount = responses.filter(
      (r) => r.decision === "approved"
    ).length;
    const finalDecision: ModelDecision =
      approvedCount >= 2 ? "approved" : "rejected";

    const categories = responses.map((r) => r.category);
    const categoryCounts = categories.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<Category, number>);

    let finalCategory: Category = "General";
    if (Object.keys(categoryCounts).length > 0) {
      const maxCount = Math.max(...Object.values(categoryCounts));
      const mostCommon = Object.entries(categoryCounts)
        .filter(([_, count]) => count === maxCount)
        .map(([cat]) => cat as Category);
      finalCategory = mostCommon[0];
    }

    return { finalDecision, finalCategory, modelResponses: responses };
  }
}
