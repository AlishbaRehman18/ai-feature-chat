
import type { ChatUIMessage } from "..."; // wherever that's defined/imported from

function MessageBubble({ message }: { message: ChatUIMessage }) {
  return (
    <>
      {message.parts.map((part, index) => {
        if (part.type === "tool-scoreLead") {
          return (
            <ScoreLeadToolPart
              key={index}
              state={part.state}
              input={part.input}
              output={part.output}
              error={part.errorText ? new Error(part.errorText) : undefined}
            />
          );
        }
        return null;
      })}
    </>
  );
}