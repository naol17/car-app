import { useEffect, useState } from "react";
import Car from "./components/Car";
function App() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [paginatedCars, setPaginatedCars] = useState(undefined);
  const [currentindex, setCurrentIndex] = useState(6);

  const getCarsFromApi = () => {
    fetch("https://mocki.io/v1/a3892440-24f6-4403-bc18-9960b53f935c")
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json.cars);
        setCars(json.cars);
      })
      .catch((e) =>
        setError(`Something went wrong. please try again. Details: ${e}`)
      );
  };

  // fetch the cars data
  useEffect(() => {
    getCarsFromApi();
  }, []);

  // slice the cars array to get the first 6 cars
  useEffect(() => {
    if (cars) {
      setPaginatedCars(cars.slice(0, currentindex));
    }
  }, [cars]);

  const loadMore = () => {
    console.log("currentindex", currentindex);
    setCurrentIndex(currentindex + 6);
    if (currentindex + 6 > cars.length) {
      setPaginatedCars(cars.slice(0, cars.length));
      return;
    }

    setPaginatedCars(cars.slice(0, currentindex + 6));
  };

  if (!paginatedCars)
    return (
      <div className="h-48 w-screen flex justify-center align-middle text-xl pt-52">
        Loading Cars please wait...
      </div>
    );

  if (paginatedCars.length === 0)
    return (
      <div className="h-screen w-screen flex justify-center align-middle text-xl pt-52">
        No cars found
      </div>
    );

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center align-middle text-xl text-red-500">
        {error}
      </div>
    );
  }
  return (
    <div className="flex flex-col px-40 pt-5 gap-4">
      <h1 className="text-xl font-medium text-center py-4">
        Proudly Developed By Naol Dame <br />
        <a href="mailto:naodosc@gmail.com" className="text-blue-400">
          naodosc@gmail.com
        </a>
      </h1>

      <h1 className="text-3xl font-medium text-center py-4">
        Your Favorite Cars
      </h1>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6">
        {paginatedCars.map((car) => (
          <Car car={car} key={car.id} />
        ))}
      </div>
      <div className="flex justify-center items-center mb-10 mt-5">
        <button
          className="text-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-500"
          disabled={currentindex >= cars.length}
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
