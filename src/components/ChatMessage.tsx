"use client";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === "user") {
    return <div className="chat-msg chat-msg-user">{content}</div>;
  }

  // For assistant messages, render bold text via dangerouslySetInnerHTML
  // Convert **text** to <strong>text</strong> and newlines to <br>
  const html = content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");

  return (
    <div
      className="chat-msg chat-msg-ai"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
