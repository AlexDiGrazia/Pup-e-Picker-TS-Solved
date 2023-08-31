// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Displays, Dog } from "../types";
import { sectionButtonsArray } from "../sectionButtonsArray";
import { SectionButton } from "../SectionButton";
import { isActive } from "../Functional/FunctionalSection";

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

  setIsActive = (isActive: isActive) => {
    this.setState({ isActive });
  };

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
            {sectionButtonsArray.map((obj) => (
              <SectionButton
                isActive={isActive[obj.collection]}
                setIsActive={this.setIsActive}
                display={display}
                setDisplay={setDisplay}
                collection={obj.collection}
                hasTotal={obj.hasTotal}
                allDogs={allDogs}
                filter={obj.filter}
              />
            ))}
          </div>
        </div>
        <div className="content-container">{this.props.children}</div>
      </section>
    );
  }
}
