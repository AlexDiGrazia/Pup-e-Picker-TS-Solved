import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Displays } from "../types";
import { SectionButton } from "../SectionButton";

type SectionProps = {
  children: ReactNode;
  display: string;
  toggleDisplay: (display: Displays) => void;
  total: {
    favorites: number;
    unFavorites: number;
  };
};

export const FunctionalSection = ({
  children,
  display,
  toggleDisplay,
  total,
}: SectionProps) => {
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          <SectionButton
            isActive={display === "favorited"}
            onClick={() => toggleDisplay("favorited")}
            label={`favorited ( ${total.favorites} )`}
          />
          <SectionButton
            isActive={display === "unFavorited"}
            onClick={() => toggleDisplay("unFavorited")}
            label={`unfavorited ( ${total.unFavorites} )`}
          />
          <SectionButton
            isActive={display === "createDog"}
            onClick={() => toggleDisplay("createDog")}
            label={"create dog"}
          />
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
