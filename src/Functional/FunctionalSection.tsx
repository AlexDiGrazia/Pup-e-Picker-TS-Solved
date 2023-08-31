import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Displays, Dog } from "../types";
import { SectionButton } from "../SectionButton";
import { sectionButtonsArray } from "../sectionButtonsArray";

export type isActive = {
  favorited: boolean;
  unFavorited: boolean;
  createDog: boolean;
};

type SectionProps = {
  children: ReactNode;
  allDogs: Dog[];
  display: string;
  setDisplay: Dispatch<SetStateAction<Displays>>;
};

export const FunctionalSection = ({
  children,
  allDogs,
  display,
  setDisplay,
}: SectionProps) => {
  const [isActive, setIsActive] = useState<isActive>({
    favorited: false,
    unFavorited: false,
    createDog: false,
  });

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {sectionButtonsArray.map((obj) => (
            <SectionButton
              isActive={isActive[obj.collection]}
              setIsActive={setIsActive}
              display={display}
              setDisplay={setDisplay}
              collection={obj.collection}
              hasTotal={obj.hasTotal}
              allDogs={allDogs}
              filter={obj.filter}
            />
          ))}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
