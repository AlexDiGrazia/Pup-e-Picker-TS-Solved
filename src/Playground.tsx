import { Requests } from "./api";

const messAround = async () => {
  Requests.getAllDogs().then((res) => Requests.dummyFunction(res));

  // await Requests.dummyFunction();
};

export const Playground = () => {
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround();
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
    </div>
  );
};
