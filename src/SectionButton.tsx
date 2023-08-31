import { Dispatch, SetStateAction } from "react";
import { Displays, Dog } from "./types";
import { isActive } from "./Functional/FunctionalSection";

type SectionButtonProps = {
  isActive: boolean;
  setIsActive:
    | Dispatch<SetStateAction<isActive>>
    | ((isActive: isActive) => void);
  display: string;
  setDisplay:
    | Dispatch<SetStateAction<Displays>>
    | ((newDisplay: Displays) => void);
  collection: Displays;
  hasTotal: boolean;
  allDogs: Dog[];
  filter: (dog: Dog) => boolean;
};

export const SectionButton = ({
  isActive,
  setIsActive,
  display,
  setDisplay,
  collection,
  hasTotal,
  allDogs,
  filter,
}: SectionButtonProps) => {
  const newActiveStatus = isActive === false ? true : false;

  const favorited = collection === "favorited" ? newActiveStatus : false;
  const unFavorited = collection === "unFavorited" ? newActiveStatus : false;
  const createDog = collection === "createDog" ? newActiveStatus : false;

  /* only one button allowed to be active at a time */
  const newButtonConfig = {
    favorited,
    unFavorited,
    createDog,
  };

  const newDisplay = display === collection ? "allDogs" : collection;

  return (
    <div
      className={`selector ${isActive && "active"}`}
      onClick={() => {
        setIsActive(newButtonConfig);
        setDisplay(newDisplay);
      }}
    >
      {collection} {hasTotal && `( ${allDogs.filter(filter).length} )`}
    </div>
  );
};
