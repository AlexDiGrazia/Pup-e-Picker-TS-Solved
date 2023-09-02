import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";

type DogsProps = {
  collection: Dog[];
  deleteDog: (dog: Dog) => void;
  toggleFavoriteStatus: (dog: Dog) => void;
  isLoading: boolean;
};

export class ClassDogs extends Component<DogsProps> {
  render() {
    const { collection, isLoading, deleteDog, toggleFavoriteStatus } =
      this.props;
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
  }
}
