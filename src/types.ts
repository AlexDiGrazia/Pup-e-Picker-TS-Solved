// Add your own custom types in here
export type Displays = "allDogs" | "favorites" | "unFavorites" | "form";

export type Dog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};
