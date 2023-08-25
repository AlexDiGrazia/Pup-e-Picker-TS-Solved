import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type State = {
  allDogs: Dog[];
};

type Props = {
  display: "allDogs" | "favorites" | "unFavorites";
};

export class ClassDogs extends Component<Props, State> {
  state: State = {
    allDogs: [],
  };

  fetchData = () => {
    Requests.getAllDogs().then((data) => this.setState({ allDogs: data }));
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
    const { display } = this.props;
    const { allDogs } = this.state;
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
