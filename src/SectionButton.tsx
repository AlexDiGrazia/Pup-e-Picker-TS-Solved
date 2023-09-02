import { /* Dispatch, */ ReactNode /* SetStateAction */ } from "react";
// import { Displays } from "./types";

type SectionButtonProps = {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  label: ReactNode;
};

export const SectionButton = ({
  isActive,
  onClick,
  label,
}: SectionButtonProps) => {
  return (
    <div className={`selector ${isActive && "active"}`} onClick={onClick}>
      {label}
    </div>
  );
};
