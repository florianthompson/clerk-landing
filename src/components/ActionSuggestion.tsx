"use client";

interface ActionSuggestionProps {
  actions: string[];
  onSelect: (action: string) => void;
}

export default function ActionSuggestion({ actions, onSelect }: ActionSuggestionProps) {
  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      {actions.map((action) => (
        <button
          key={action}
          className="chat-action"
          onClick={() => onSelect(action)}
        >
          {action}
        </button>
      ))}
    </div>
  );
}
