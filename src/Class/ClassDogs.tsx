import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Requests } from "../api";
import { Dog } from "../types";

type State = {
  allDogs: Dog[];
};

export class ClassDogs extends Component<Record<string, never>, State> {
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

  render() {
    const { allDogs } = this.state;
    return (
      <>
        {allDogs.map((dog) => (
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
