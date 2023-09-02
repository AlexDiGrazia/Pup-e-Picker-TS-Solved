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

  useEffect(() => {
    fetchData();
  }, []);

  const filterCB = {
    allDogs: (dog: Dog) => dog,
    favorited: (dog: Dog) => dog.isFavorite === true,
    unFavorited: (dog: Dog) => dog.isFavorite === false,
    createDog: (dog: Dog) => dog,
  };
  const collection = allDogs.filter(filterCB[display]);
  const favorites = allDogs.filter(filterCB.favorited).length;
  const unFavorites = allDogs.filter(filterCB.unFavorited).length;

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        display={display}
        toggleDisplay={toggleDisplay}
        total={{
          favorites,
          unFavorites,
        }}
      >
        {display !== "createDog" && (
          <FunctionalDogs
            collection={collection}
            deleteDog={deleteDog}
            toggleFavoriteStatus={toggleFavoriteStatus}
            isLoading={isLoading}
          />
        )}
        {display === "createDog" && (
          <FunctionalCreateDogForm
            isLoading={isLoading}
            loadingStateHandler={loadingStateHandler}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
