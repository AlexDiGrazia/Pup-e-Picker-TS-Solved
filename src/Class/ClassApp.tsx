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

  loadingStateHandler = (apiCall: Promise<Dog>): Promise<void> => {
    this.setState({ isLoading: true });
    return apiCall
      .then(() => this.fetchData())
      .finally(() => this.setState({ isLoading: false }));
  };

  fetchData = () => {
    Requests.getAllDogs().then((data) => this.setState({ allDogs: data }));
  };

  setDisplay = (newDisplay: Displays) => {
    this.setState({ display: newDisplay });
  };

  render() {
    const { display, allDogs, isLoading } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          allDogs={allDogs}
          display={display}
          setDisplay={this.setDisplay}
        >
          {display !== "createDog" && (
            <ClassDogs
              allDogs={allDogs}
              display={display}
              fetchData={this.fetchData}
              isLoading={isLoading}
              loadingStateHandler={this.loadingStateHandler}
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
