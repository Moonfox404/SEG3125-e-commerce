"use client";
import { MockProducts } from "../mock-data/MockProducts";
import { useState } from "react";

type ProductImagesProps = {
  productID: number;
};

export default function ProductImages({ productID }: ProductImagesProps) {
  const currentProduct = MockProducts[productID];
  const thumbnails = currentProduct.images;
  const extraCount = thumbnails.length - 3;

  // Build full array: main image first, then thumbnails
  const allImages = [
    { type: "main", src: `../../products/${currentProduct.id}.png` },
    ...thumbnails.map((num) => ({
      type: "thumb",
      src: `../../products/${currentProduct.id}_${num}.png`,
    })),
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const openModal = (idx: number) => {
    setCurrentIdx(idx);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const prevImage = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };
  const nextImage = () => {
    if (currentIdx < allImages.length - 1) setCurrentIdx(currentIdx + 1);
  };

  return (
    <div className="flex flex-col p-2 gap-5 max-w-2xl items-center justify-center">
      {/* Main product image */}
      <img
        src={allImages[0].src}
        alt={currentProduct.name}
        className="w-full object-contain cursor-pointer"
        onClick={() => openModal(0)}
      />

      {/* Thumbnails row (up to 3) */}
      <div className="flex flex-row gap-5 p-2 max-w-[400px] justify-center flex-wrap">
        {allImages.slice(1, 4).map((img, idx) => {
          const globalIdx = idx + 1; // offset by main
          if (idx === 2 && extraCount > 0) {
            return (
              <button
                key={globalIdx}
                onClick={() => openModal(globalIdx)}
                className="w-20 h-20 flex items-center justify-center bg-gray-200 text-gray-700 text-lg font-semibold"
              >
                +{extraCount + 1}
              </button>
            );
          }
          return (
            <img
              key={globalIdx}
              src={img.src}
              alt={`${currentProduct.name} thumbnail ${idx + 1}`}
              className="w-20 h-20 object-cover cursor-pointer"
              onClick={() => openModal(globalIdx)}
            />
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && currentIdx !== null && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-5"
          onClick={closeModal}
        >
          <div
            className="flex p-4 bg-white rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row gap-2 p-2 justify-center items-center">
              <button
                onClick={prevImage}
                disabled={currentIdx <= 0}
                className="hover:scale-150 transition-all ease-in duration-100 cursor-pointer"
              >
                &larr;
              </button>
              <img
                src={allImages[currentIdx].src}
                alt={`${currentProduct.name} enlarged`}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <button
                onClick={nextImage}
                disabled={currentIdx === allImages.length - 1}
                className="hover:scale-150 transition-all ease-in duration-100 cursor-pointer"
              >
                &rarr;
              </button>
            </div>
            <button
              onClick={closeModal}
              className="self-start hover:scale-150 transition-all ease-in duration-100 cursor-pointer"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
