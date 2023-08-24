// you can use this type for react children if you so choose
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Displays } from "../types";

type isActive = {
  favorited: boolean;
  unFavorited: boolean;
  createDog: boolean;
};

export const FunctionalSection = ({
  children,
  display,
  setDisplay,
}: {
  children: ReactNode;
  display: string;
  setDisplay: Dispatch<SetStateAction<Displays>>;
}) => {
  const [isActive, setIsActive] = useState<isActive>({
    favorited: false,
    unFavorited: false,
    createDog: false,
  });

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${isActive.favorited && "active"}`}
            onClick={() => {
              const newButtonState =
                isActive.favorited === false ? true : false;
              const newDisplay =
                display === "favorites" ? "allDogs" : "favorites";
              setIsActive({
                favorited: newButtonState,
                unFavorited: false,
                createDog: false,
              });
              setDisplay(newDisplay);
            }}
          >
            favorited ( 12 )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${isActive.unFavorited && "active"}`}
            onClick={() => {
              const newButtonState =
                isActive.unFavorited === false ? true : false;
              const newDisplay =
                display === "unFavorites" ? "allDogs" : "unFavorites";
              setIsActive({
                favorited: false,
                unFavorited: newButtonState,
                createDog: false,
              });
              setDisplay(newDisplay);
            }}
          >
            unfavorited ( 25 )
          </div>
          <div
            className={`selector ${isActive.createDog && "active"}`}
            onClick={() => {
              const newButtonState =
                isActive.createDog === false ? true : false;
              const newDisplay = display === "form" ? "allDogs" : "form";
              setIsActive({
                favorited: false,
                unFavorited: false,
                createDog: newButtonState,
              });
              setDisplay(newDisplay);
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
