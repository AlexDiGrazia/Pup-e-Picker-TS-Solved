import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Displays } from "../types";

export function FunctionalApp() {
  const [display, setDisplay] = useState<Displays>("allDogs");

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection display={display} setDisplay={setDisplay}>
        {display === "allDogs" && <FunctionalDogs />}
        {display === "form" && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
