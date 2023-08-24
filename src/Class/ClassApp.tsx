import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Displays } from "../types";

type State = {
  display: Displays;
};

export class ClassApp extends Component<Record<string, never>, State> {
  state: State = { display: "allDogs" };

  setDisplay = (newDisplay: Displays) => {
    this.setState({ display: newDisplay });
  };

  render() {
    const { display } = this.state;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection display={display} setDisplay={this.setDisplay}>
          {display === "allDogs" && <ClassDogs />}
          {display === "form" && <ClassCreateDogForm />}
        </ClassSection>

        {/* should be inside of the ClassSection component using react children */}
      </div>
    );
  }
}
