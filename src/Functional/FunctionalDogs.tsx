import { useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

type DogsProps = {
  display: "allDogs" | "favorites" | "unFavorites";
  allDogs: Dog[];
  fetchData: () => void;
  isLoading: boolean;
  loadingStateHandler: (apiCall: Promise<Dog>) => Promise<void>;
};

export const FunctionalDogs = ({
  display,
  allDogs,
  fetchData,
  isLoading,
  loadingStateHandler,
}: DogsProps) => {
  const toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    loadingStateHandler(Requests.updateDog(dog.id, { isFavorite: newStatus }));
  };

  const deleteDog = (dog: Dog) => {
    loadingStateHandler(Requests.deleteDog(dog.id));
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
