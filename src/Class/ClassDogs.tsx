import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type Props = {
  display: "allDogs" | "favorites" | "unFavorites";
  allDogs: Dog[];
  setAllDogs: (data: Dog[]) => void;
};

export class ClassDogs extends Component<Props> {
  fetchData = () => {
    Requests.getAllDogs().then((data) => this.props.setAllDogs(data));
  };

  toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    Requests.updateDog(dog.id, { isFavorite: newStatus }).then(() =>
      this.fetchData()
    );
  };

  componentDidMount(): void {
    this.fetchData();
  }

  filterCB = {
    allDogs: (dog: Dog) => dog,
    favorites: (dog: Dog) => dog.isFavorite === true,
    unFavorites: (dog: Dog) => dog.isFavorite === false,
  };

  render() {
    const { display, allDogs } = this.props;
    return (
      <>
        {allDogs.filter(this.filterCB[display]).map((dog: Dog) => (
          <DogCard
            dog={{ ...dog }}
            key={dog.id}
            onTrashIconClick={() => {
              Requests.deleteDog(dog.id).then(() => this.fetchData());
            }}
            onHeartClick={() => {
              this.toggleFavoriteStatus(dog);
            }}
            onEmptyHeartClick={() => {
              this.toggleFavoriteStatus(dog);
            }}
            isLoading={false}
          />
        ))}
      </>
    );
  }
}
