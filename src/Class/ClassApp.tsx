import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Displays, Dog } from "../types";

type State = {
  display: Displays;
  allDogs: Dog[];
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = {
    display: "allDogs",
    allDogs: [],
  };

  setDisplay = (newDisplay: Displays) => {
    this.setState({ display: newDisplay });
  };

  setAllDogs = (data: Dog[]) => {
    this.setState({ allDogs: data });
  };

  render() {
    const { display, allDogs } = this.state;
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
          {display !== "form" && (
            <ClassDogs
              display={display}
              allDogs={allDogs}
              setAllDogs={this.setAllDogs}
            />
          )}
          {display === "form" && <ClassCreateDogForm />}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
