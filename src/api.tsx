import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),

  postDog: (dog: Omit<Dog, "id">): Promise<Dog> =>
    fetch(`${baseUrl}/dogs`, {
      body: JSON.stringify(dog),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),

  deleteDog: (id: number): Promise<Dog> =>
    fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    }).then((response) => response.json()),

  updateDog: () => {},

  // Just a dummy function for use in the playground
  dummyFunction: (data: Dog[]) => {
    console.log(data);
  },
};
