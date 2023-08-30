import { useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Displays, Dog } from "../types";
import { Requests } from "../api";

export function FunctionalApp() {
  const [display, setDisplay] = useState<Displays>("allDogs");
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = () => Requests.getAllDogs().then(setAllDogs);

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
            display={display}
            fetchData={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        {display === "form" && (
          <FunctionalCreateDogForm
            fetchData={fetchData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
