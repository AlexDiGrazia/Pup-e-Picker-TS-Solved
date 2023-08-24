import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

type State = {
  nameInput: string;
  imageInput: string;
  descriptionInput: string;
};
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<
  Record<string, never>,
  State
> {
  state: State = {
    nameInput: "",
    imageInput: defaultSelectedImage,
    descriptionInput: "",
  };
  render() {
    const { nameInput, imageInput, descriptionInput } = this.state;
    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          Requests.postDog({
            name: nameInput,
            image: imageInput,
            description: descriptionInput,
            isFavorite: false,
          });
          this.setState({
            nameInput: "",
            imageInput: defaultSelectedImage,
            descriptionInput: "",
          });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => this.setState({ nameInput: e.target.value })}
          disabled={false}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          value={descriptionInput}
          onChange={(e) => this.setState({ descriptionInput: e.target.value })}
          cols={80}
          rows={10}
          disabled={false}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          value={imageInput}
          onChange={(e) => this.setState({ imageInput: e.target.value })}
          disabled={false}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={false} />
      </form>
    );
  }
}
