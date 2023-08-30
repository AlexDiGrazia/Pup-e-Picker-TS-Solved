import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type DogsProps = {
  allDogs: Dog[];
  display: "allDogs" | "favorites" | "unFavorites";
  fetchData: () => void;
  isLoading: boolean;
  loadingStateHandler: (apiCall: Promise<Dog>) => Promise<void>;
};

export class ClassDogs extends Component<DogsProps> {
  toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    this.props.loadingStateHandler(
      Requests.updateDog(dog.id, { isFavorite: newStatus })
    );
  };

  deleteDog = (dog: Dog) => {
    this.props.loadingStateHandler(Requests.deleteDog(dog.id));
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
