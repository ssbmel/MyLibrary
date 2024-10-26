import { PropsWithChildren } from "react";

export default function BackButton({ children }: PropsWithChildren) {
  return (
    <button className="w-[50%] bg-black text-white p-[6px] rounded-sm">
      {children}
    </button>
  );
}
