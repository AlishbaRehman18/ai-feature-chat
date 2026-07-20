import { ScoreCard } from "./ScoreCard";

interface ScoreLeadInput {
  name: string;
  email: string;
  companySize: string;
}

interface ScoreLeadOutput {
  score: number;
  tier: string;
  reasons: string[];
}

type ScoreLeadToolPartProps =
  | { state: "input-streaming"; input?: Partial<ScoreLeadInput>; output?: undefined; error?: undefined }
  | { state: "input-available"; input: ScoreLeadInput; output?: undefined; error?: undefined }
  | { state: "output-available"; input: ScoreLeadInput; output: ScoreLeadOutput; error?: undefined }
  | { state: "output-error"; input?: ScoreLeadInput; output?: undefined; error: Error };

export function ScoreLeadToolPart({ state, input, output, error }: ScoreLeadToolPartProps) {
  if (state === "input-streaming") {
    return (
      <div className="p-3 border rounded bg-gray-100">
        Preparing input…
      </div>
    );
  }

  if (state === "input-available") {
    return (
      <div className="p-3 border rounded bg-gray-200">
        <h3 className="font-bold">Lead Scoring Input</h3>
        <p>Name: {input.name}</p>
        <p>Email: {input.email}</p>
        <p>Company Size: {input.companySize}</p>
      </div>
    );
  }

  if (state === "output-available") {
    return <ScoreCard output={output} />;
  }

  if (state === "output-error") {
    return (
      <div className="p-3 border rounded bg-red-200 text-red-700">
        <h3 className="font-bold">Lead scoring failed</h3>
        <p>{error.message}</p>
      </div>
    );
  }

  return null;
}
