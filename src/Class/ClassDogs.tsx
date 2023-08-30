import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type Props = {
  allDogs: Dog[];
  display: "allDogs" | "favorites" | "unFavorites";
  fetchData: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
};

export class ClassDogs extends Component<Props> {
  toggleFavoriteStatus = (dog: Dog) => {
    const { setIsLoading, fetchData } = this.props;
    const newStatus = dog.isFavorite === false ? true : false;
    setIsLoading(true);
    Requests.updateDog(dog.id, { isFavorite: newStatus })
      .then(() => fetchData())
      .finally(() => setIsLoading(false));
  };

  deleteDog = (dog: Dog) => {
    const { setIsLoading, fetchData } = this.props;
    setIsLoading(true);
    Requests.deleteDog(dog.id)
      .then(() => fetchData())
      .finally(() => setIsLoading(false));
  };

  componentDidMount(): void {
    this.props.fetchData();
  }

  filterCB = {
    allDogs: (dog: Dog) => dog,
    favorites: (dog: Dog) => dog.isFavorite === true,
    unFavorites: (dog: Dog) => dog.isFavorite === false,
  };

  render() {
    const { display, allDogs, isLoading } = this.props;
    return (
      <>
        {allDogs.filter(this.filterCB[display]).map((dog: Dog) => (
          <DogCard
            dog={{ ...dog }}
            key={dog.id}
            onTrashIconClick={() => {
              this.deleteDog(dog);
            }}
            onHeartClick={() => {
              this.toggleFavoriteStatus(dog);
            }}
            onEmptyHeartClick={() => {
              this.toggleFavoriteStatus(dog);
            }}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
