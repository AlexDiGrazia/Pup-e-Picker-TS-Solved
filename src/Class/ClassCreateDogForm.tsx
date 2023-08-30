import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

type State = {
  nameInput: string;
  imageInput: string;
  descriptionInput: string;
};

type Props = {
  fetchData: () => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
};
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<Props, State> {
  state: State = {
    nameInput: "",
    imageInput: defaultSelectedImage,
    descriptionInput: "",
  };

  handleSubmit = (e: React.FormEvent) => {
    const { nameInput, imageInput, descriptionInput } = this.state;
    const { setIsLoading, fetchData } = this.props;
    e.preventDefault();
    setIsLoading(true);
    Requests.postDog({
      name: nameInput,
      image: imageInput,
      description: descriptionInput,
      isFavorite: false,
    })
      .then(() => fetchData())
      .then(() => toast.success("Dog Created"))
      .finally(() => setIsLoading(false));

    this.setState({
      nameInput: "",
      imageInput: defaultSelectedImage,
      descriptionInput: "",
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
