import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <div className="pt-0   mx-auto">{children}</div>;
}

export default Wrapper;
