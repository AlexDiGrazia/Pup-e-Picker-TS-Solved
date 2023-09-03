import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
import { toast } from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

type FormProps = {
  createDog: (newDog: Omit<Dog, "id">) => Promise<void>;
  isLoading: boolean;
};

export const FunctionalCreateDogForm = ({
  createDog,
  isLoading,
}: FormProps) => {
  const [nameInput, setNameInput] = useState<string>("");
  const [descriptionInput, setDescriptionInput] = useState<string>("");
  const [imageInput, setImageInput] = useState<string>(defaultSelectedImage);

  const newDog = {
    name: nameInput,
    image: imageInput,
    description: descriptionInput,
    isFavorite: false,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDog(newDog)
      .then(() => toast.success("Dog Created"))
      .then(() => {
        setNameInput("");
        setDescriptionInput("");
        setImageInput(defaultSelectedImage);
      });
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
        disabled={isLoading}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name="description"
        id="description"
        value={descriptionInput}
        onChange={(e) => setDescriptionInput(e.target.value)}
        cols={80}
        rows={10}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id="picture"
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
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
};
