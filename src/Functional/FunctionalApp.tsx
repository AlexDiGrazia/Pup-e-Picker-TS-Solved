import { useEffect, useState } from "react";
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

  const loadingStateHandler = (apiCall: Promise<Dog>): Promise<void> => {
    setIsLoading(true);
    return apiCall.then(() => fetchData()).finally(() => setIsLoading(false));
  };

  const toggleFavoriteStatus = (dog: Dog) => {
    const newStatus = dog.isFavorite === false ? true : false;
    loadingStateHandler(Requests.updateDog(dog.id, { isFavorite: newStatus }));
  };

  const toggleDisplay = (collection: Displays) => {
    const newDisplay = display === collection ? "allDogs" : collection;
    setDisplay(newDisplay);
  };

  const deleteDog = (dog: Dog) => {
    loadingStateHandler(Requests.deleteDog(dog.id));
  };

  const createDog = (newDog: Omit<Dog, "id">) =>
    loadingStateHandler(Requests.postDog(newDog));

  useEffect(() => {
    fetchData();
  }, []);

  const collection = {
    allDogs,
    favorited: allDogs.filter((dog: Dog) => dog.isFavorite === true),
    unFavorited: allDogs.filter((dog: Dog) => dog.isFavorite === false),
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        display={display}
        toggleDisplay={toggleDisplay}
        total={{
          favorites: collection.favorited.length,
          unFavorites: collection.unFavorited.length,
        }}
      >
        {display !== "createDog" && (
          <FunctionalDogs
            collection={collection[display]}
            deleteDog={deleteDog}
            toggleFavoriteStatus={toggleFavoriteStatus}
            isLoading={isLoading}
          />
        )}
        {display === "createDog" && (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
