import { ReactNode } from "react";

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl text-center border-b-2 border-amber-50 mb-4">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="pl-6 pb-2 font-bold text-base">{children}</h3>;
}
