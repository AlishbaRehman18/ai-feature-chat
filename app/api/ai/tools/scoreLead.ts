import { z } from "zod";

export const scoreLeadInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  companySize: z.enum(["small", "medium", "enterprise"]),
});

export const scoreLeadOutputSchema = z.object({
  score: z.number(),
  tier: z.enum(["hot", "warm", "cold"]),
  reasons: z.array(z.string()),
});

export async function executeScoreLead(input: z.infer<typeof scoreLeadInputSchema>) {
  const score =
    (input.companySize === "enterprise" ? 70 : 50) +
    (input.email.endsWith(".io") ? 10 : 0);

  const tier =
    score >= 80 ? "hot" :
    score >= 60 ? "warm" :
    "cold";

  return {
    score,
    tier,
    reasons: [
      `Company size: ${input.companySize}`,
      `Email domain: ${input.email.split("@")[1]}`
    ]
  };
}
