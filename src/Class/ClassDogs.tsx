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

  componentDidMount(): void {
    Requests.getAllDogs().then((data) => this.setState({ allDogs: data }));
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
              alert("clicked trash");
            }}
            onHeartClick={() => {
              alert("clicked heart");
            }}
            onEmptyHeartClick={() => {
              alert("clicked empty heart");
            }}
            isLoading={false}
          />
        ))}
      </>
    );
  }
}
