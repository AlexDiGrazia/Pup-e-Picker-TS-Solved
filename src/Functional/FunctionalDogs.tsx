import { Dispatch, SetStateAction, useEffect } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  display,
  allDogs,
  setAllDogs,
}: {
  display: "allDogs" | "favorites" | "unFavorites";
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
}) => {
  const fetchData = () => Requests.getAllDogs().then(setAllDogs);

  const toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    Requests.updateDog(dog.id, { isFavorite: newStatus }).then(() =>
      fetchData()
    );
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
            Requests.deleteDog(dog.id).then(() => fetchData());
          }}
          onHeartClick={() => {
            toggleFavoriteStatus(dog);
          }}
          onEmptyHeartClick={() => {
            toggleFavoriteStatus(dog);
          }}
          isLoading={false}
        />
      ))}
    </>
  );
};
