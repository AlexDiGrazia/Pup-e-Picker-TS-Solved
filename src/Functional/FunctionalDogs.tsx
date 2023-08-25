import { useEffect, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

export const FunctionalDogs = ({
  display,
}: {
  display: "allDogs" | "favorites" | "unFavorites";
}) => {
  const [allDogs, setDogs] = useState<Dog[]>([]);

  const fetchData = () => Requests.getAllDogs().then(setDogs);

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
