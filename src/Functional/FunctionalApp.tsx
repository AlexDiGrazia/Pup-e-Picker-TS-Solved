import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Displays, Dog } from "../types";

export function FunctionalApp() {
  const [display, setDisplay] = useState<Displays>("allDogs");
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        display={display}
        setDisplay={setDisplay}
      >
        {display !== "form" && (
          <FunctionalDogs
            allDogs={allDogs}
            setAllDogs={setAllDogs}
            display={display}
          />
        )}
        {display === "form" && <FunctionalCreateDogForm />}
      </FunctionalSection>
    </div>
  );
}
