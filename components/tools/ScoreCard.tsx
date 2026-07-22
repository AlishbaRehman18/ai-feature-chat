interface ScoreCardProps {
    output: {
      score: number;
      tier: string;
      reasons: string[];
    };
  }
  
  export function ScoreCard({ output }: ScoreCardProps) {
    return (
      <div className="p-4 border rounded bg-green-50">
        <h3 className="font-bold">Lead Score</h3>
        <p>Score: {output.score}</p>
        <p>Tier: {output.tier}</p>
  
        <ul className="mt-2 list-disc pl-4">
          {output.reasons.map((reason: string, index: number) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    );
  }