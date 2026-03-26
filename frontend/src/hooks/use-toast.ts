import type { ReactNode } from "react";

export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function useToast() {
  // Basic stub implementation; customize as needed.
  const toasts: Toast[] = [];

  return { toasts };
}
