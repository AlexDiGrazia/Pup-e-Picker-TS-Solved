import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = () => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);

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
        setNameInput("");
        setDescriptionInput("");
        setImageInput(defaultSelectedImage);
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        disabled={false}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
        cols={80}
        rows={10}
        disabled={false}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
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
      <input type="submit" />
    </form>
  );
};
