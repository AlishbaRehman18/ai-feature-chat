import type { UIMessage } from "ai";
import type { z } from "zod";
import type {
  scoreLeadInputSchema,
  scoreLeadOutputSchema
} from "@/app/api/ai/tools/scoreLead";

type ScoreLeadInput = z.infer<typeof scoreLeadInputSchema>;
type ScoreLeadOutput = z.infer<typeof scoreLeadOutputSchema>;

export type ChatUIMessage = UIMessage<
  never,
  never,
  {
    scoreLead: {
      input: ScoreLeadInput;
      output: ScoreLeadOutput;
    };
  }
>;