import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="p-8 pt-0  max-w-[1024px] mx-auto">{children}</div>;
}

export default Wrapper;
