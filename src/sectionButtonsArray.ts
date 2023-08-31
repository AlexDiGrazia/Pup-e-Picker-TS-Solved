import { isActive } from "./Functional/FunctionalSection";
import { Dog } from "./types";

export type SectionButton = {
  collection: keyof isActive;
  filter: (dog: Dog) => boolean;
  hasTotal: boolean;
};

export const sectionButtonsArray: SectionButton[] = [
  {
    collection: "favorited",
    filter: (dog: Dog) => dog.isFavorite === true,
    hasTotal: true,
  },
  {
    collection: "unFavorited",
    filter: (dog: Dog) => dog.isFavorite === false,
    hasTotal: true,
  },
  {
    collection: "createDog",
    filter: (dog: Dog) => dog.isFavorite === false,
    hasTotal: false,
  },
];
