import { Dispatch, SetStateAction, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  display,
  allDogs,
  fetchData,
  isLoading,
  setIsLoading,
}: {
  display: "allDogs" | "favorites" | "unFavorites";
  allDogs: Dog[];
  fetchData: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    setIsLoading(true);
    Requests.updateDog(dog.id, { isFavorite: newStatus })
      .then(() => fetchData())
      .finally(() => setIsLoading(false));
  };

  const deleteDog = (dog: Dog) => {
    setIsLoading(true);
    Requests.deleteDog(dog.id)
      .then(() => fetchData())
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterCB = {
    allDogs: (dog: Dog) => dog,
    favorites: (dog: Dog) => dog.isFavorite === true,
    unFavorites: (dog: Dog) => dog.isFavorite === false,
  };

  return (
    <>
      {allDogs.filter(filterCB[display]).map((dog: Dog) => (
        <DogCard
          dog={{ ...dog }}
          key={dog.id}
          onTrashIconClick={() => {
            deleteDog(dog);
          }}
          onHeartClick={() => {
            toggleFavoriteStatus(dog);
          }}
          onEmptyHeartClick={() => {
            toggleFavoriteStatus(dog);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
