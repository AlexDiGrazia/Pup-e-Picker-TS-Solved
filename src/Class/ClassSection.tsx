// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Displays, Dog } from "../types";

type SectionProps = {
  children: ReactNode;
  allDogs: Dog[];
  display: string;
  setDisplay: (newDisplay: Displays) => void;
};

type SectionState = {
  isActive: {
    favorited: boolean;
    unFavorited: boolean;
    createDog: boolean;
  };
};

export class ClassSection extends Component<SectionProps, SectionState> {
  state: SectionState = {
    isActive: {
      favorited: false,
      unFavorited: false,
      createDog: false,
    },
  };

  favorites = (dog: Dog) => dog.isFavorite === true;
  unFavorites = (dog: Dog) => dog.isFavorite === false;

  render() {
    const { isActive } = this.state;
    const { display, setDisplay, allDogs } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>

          <Link to={"/functional"} className="btn">
            Change to Functional
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
                this.setState({
                  isActive: {
                    favorited: newButtonState,
                    unFavorited: false,
                    createDog: false,
                  },
                });
                setDisplay(newDisplay);
              }}
            >
              favorited ( {allDogs.filter(this.favorites).length} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${isActive.unFavorited && "active"}`}
              onClick={() => {
                const newButtonState =
                  isActive.unFavorited === false ? true : false;
                const newDisplay =
                  display === "unFavorites" ? "allDogs" : "unFavorites";
                this.setState({
                  isActive: {
                    favorited: false,
                    unFavorited: newButtonState,
                    createDog: false,
                  },
                });
                setDisplay(newDisplay);
              }}
            >
              unfavorited ( {allDogs.filter(this.unFavorites).length} )
            </div>
            <div
              className={`selector ${isActive.createDog && "active"}`}
              onClick={() => {
                const newButtonState =
                  isActive.createDog === false ? true : false;
                const newDisplay = display === "form" ? "allDogs" : "form";
                this.setState({
                  isActive: {
                    favorited: false,
                    unFavorited: false,
                    createDog: newButtonState,
                  },
                });
                setDisplay(newDisplay);
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
