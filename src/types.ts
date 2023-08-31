// Add your own custom types in here
export type Displays = "allDogs" | "favorited" | "unFavorited" | "createDog";

export type Dog = {
  id: number;
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
};
