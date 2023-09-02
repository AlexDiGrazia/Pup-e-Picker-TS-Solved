import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Displays, Dog } from "../types";
import { Requests } from "../api";

type State = {
  display: Displays;
  allDogs: Dog[];
  isLoading: boolean;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    display: "allDogs",
    allDogs: [],
    isLoading: false,
  };

  fetchData = () => {
    Requests.getAllDogs().then((data) => this.setState({ allDogs: data }));
  };

  loadingStateHandler = (apiCall: Promise<Dog>): Promise<void> => {
    this.setState({ isLoading: true });
    return apiCall
      .then(() => this.fetchData())
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    this.loadingStateHandler(
      Requests.updateDog(dog.id, { isFavorite: newStatus })
    );
  };

  toggleDisplay = (collection: Displays) => {
    const newDisplay =
      this.state.display === collection ? "allDogs" : collection;
    this.setState({ display: newDisplay });
  };

  deleteDog = (dog: Dog) => {
    this.loadingStateHandler(Requests.deleteDog(dog.id));
  };

  componentDidMount(): void {
    this.fetchData();
  }

  filterCB = {
    allDogs: (dog: Dog) => dog,
    favorited: (dog: Dog) => dog.isFavorite === true,
    unFavorited: (dog: Dog) => dog.isFavorite === false,
    createDog: (dog: Dog) => dog,
  };

  filterDogs = () =>
    this.state.allDogs.filter(this.filterCB[this.state.display]);

  getTotals = (collection: Displays) =>
    this.state.allDogs.filter(this.filterCB[collection]).length;

  render() {
    const { display, isLoading } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          display={display}
          toggleDisplay={this.toggleDisplay}
          total={{
            favorites: this.getTotals("favorited"),
            unFavorites: this.getTotals("unFavorited"),
          }}
        >
          {display !== "createDog" && (
            <ClassDogs
              collection={this.filterDogs()}
              deleteDog={this.deleteDog}
              toggleFavoriteStatus={this.toggleFavoriteStatus}
              isLoading={isLoading}
            />
          )}
          {display === "createDog" && (
            <ClassCreateDogForm
              isLoading={isLoading}
              loadingStateHandler={this.loadingStateHandler}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
