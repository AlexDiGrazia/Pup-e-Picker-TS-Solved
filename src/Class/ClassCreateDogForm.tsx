import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { toast } from "react-hot-toast";
import { Dog } from "../types";

type FormState = {
  nameInput: string;
  imageInput: string;
  descriptionInput: string;
};

type FormProps = {
  isLoading: boolean;
  loadingStateHandler: (apiCall: Promise<Dog>) => Promise<void>;
};
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<FormProps, FormState> {
  state: FormState = {
    nameInput: "",
    imageInput: defaultSelectedImage,
    descriptionInput: "",
  };

  newDog = () => {
    const newDog = {
      name: this.state.nameInput,
      image: this.state.imageInput,
      description: this.state.descriptionInput,
      isFavorite: false,
    };
    return newDog;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props
      .loadingStateHandler(Requests.postDog(this.newDog()))
      .then(() => toast.success("Dog Created"))
      .then(() => {
        this.setState({
          nameInput: "",
          imageInput: defaultSelectedImage,
          descriptionInput: "",
        });
      });
  };
  render() {
    const { nameInput, imageInput, descriptionInput } = this.state;
    const { isLoading } = this.props;
    return (
      <form action="" id="create-dog-form" onSubmit={this.handleSubmit}>
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => this.setState({ nameInput: e.target.value })}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name="description"
          id="description"
          value={descriptionInput}
          onChange={(e) => this.setState({ descriptionInput: e.target.value })}
          cols={80}
          rows={10}
          disabled={isLoading}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          id="picture"
          value={imageInput}
          onChange={(e) => this.setState({ imageInput: e.target.value })}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
