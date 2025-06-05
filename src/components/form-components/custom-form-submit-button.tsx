"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      className,
      children,
      loadingText,
      isLoading = false,
      disabled,
      type = "submit",
      onClick,
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || isLoading}
        // Add default light/dark classes here
        className={cn(
          "bg-pink-500 text-white hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700",
          "focus-visible:ring-pink-500 focus-visible:ring-2 focus-visible:ring-offset-2",
          className
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin text-white dark:text-white" />
            {loadingText && <span>{loadingText}</span>}
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

SubmitButton.displayName = "SubmitButton";

export default SubmitButton;
