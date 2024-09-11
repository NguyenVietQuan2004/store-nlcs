import { MouseEventHandler } from "react";

import { Button } from "@/components/ui/button";

interface IconButtonProps {
  children: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
function IconButton({ children, onClick }: IconButtonProps) {
  return (
    <Button
      className=" border p-[5px] shadow-lg bg-white h-auto  rounded-full hover:scale-110 transition-all duration-100"
      variant={null}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default IconButton;
