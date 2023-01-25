import React from "react";

export default function ImageSlider({ car }) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const previousImage = () => {
    if (currentImageIndex == 0) return;

    setCurrentImageIndex(currentImageIndex - 1);
  };

  const nextImage = () => {
    if (currentImageIndex > car.images.length) return;

    setCurrentImageIndex(currentImageIndex + 1);
  };

  return (
    <div
      className="group relative w-full flex items-end justify-start text-left bg-cover bg-center border-2 rounded"
      style={{
        height: "400px",
        backgroundImage: `url(${car.images[currentImageIndex]})`,
      }}
    >
      {currentImageIndex > 0 && (
        <button
          className="absolute left-0 top-32 bg-black text-white h-24 px-3 text-2xl font-bold bg-opacity-70"
          onClick={previousImage}
        >
          {" "}
          &lt;{" "}
        </button>
      )}

      {currentImageIndex < car.images.length - 1 && (
        <button
          className="absolute right-0 top-32 bg-black text-white h-24 px-3 text-2xl font-bold bg-opacity-70"
          onClick={nextImage}
        >
          {" "}
          &gt;{" "}
        </button>
      )}
      <div
        className="absolute right-0 bottom-0 left-0 p-5 group-hover:block hidden duration-500"
        style={{ background: "rgba(0, 0, 0, 0.7)" }}
      >
        <main className="z-10">
          <a
            href="#"
            className="text-2xl tracking-tight font-medium leading-7 font-regular text-white hover:underline text-opacity-100"
          >
            {car.carName}
          </a>
        </main>
        <div className="mt-5 text-lg font-regular text-white flex items-center justify-between">
          <span className="mr-3 flex flex-row items-center">
            <span className="ml-1">Price ETB {car.carPrice}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
