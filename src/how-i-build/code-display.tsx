// components/CodeBlock.tsx
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button"; // from shadcn
import { Check, Copy } from "lucide-react"; // optional icons
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"; // theme

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative bg-accent-foreground rounded-md p-1">
      <CopyToClipboard
        text={code}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        <Button size="sm" variant="outline" className="absolute top-2 right-2">
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </CopyToClipboard>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ background: "transparent" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
