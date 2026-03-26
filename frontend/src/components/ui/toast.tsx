import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Toast({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={[
        "relative rounded-xl border border-border bg-card p-4 shadow-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ToastTitle({ children }: { children: ReactNode }) {
  return <div className="text-sm font-semibold">{children}</div>;
}

export function ToastDescription({ children }: { children: ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>;
}

export function ToastClose() {
  return null;
}

export function ToastViewport() {
  return <div className="fixed bottom-4 right-4 z-50" />;
}
