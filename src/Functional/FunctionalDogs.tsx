import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

type DogsProps = {
  collection: Dog[];
  deleteDog: (dog: Dog) => void;
  toggleFavoriteStatus: (dog: Dog) => void;
  isLoading: boolean;
};

export const FunctionalDogs = ({
  collection,
  deleteDog,
  toggleFavoriteStatus,
  isLoading,
}: DogsProps) => {
  return (
    <>
      {collection.map((dog) => (
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
