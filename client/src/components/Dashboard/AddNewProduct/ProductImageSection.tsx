import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { ProductContext } from "../../../context/ProductContext";
import useProductImage from "../../../hooks/useProductImage";
import { useSearchParams } from "react-router-dom";

const ProductImageSection = () => {
  const context = useContext(ProductContext);
  const { images, setImages } = context!;
  const imageRef = React.useRef<HTMLInputElement>(null);
  const mainImageRef = React.useRef<HTMLInputElement>(null);
  const { handleImageChange, handleMainImageChange } = useProductImage();
  const [searchParams] = useSearchParams();

  return (
    <>
      <div className="border border-dashed border-tertiary rounded md:w-[20rem] h-[15rem] mx-auto text-center flex justify-center items-center relative">
        {images.length > 0 ? (
          <>
            <img
              src={
                (images[0].File && URL.createObjectURL(images[0].File)) ||
                (searchParams.get("edit") && images[0].url) ||
                ""
              }
              alt="product"
              className="w-full h-full object-contain"
            />
            <div
              className="w-full h-full absolute top-0 left-0 cursor-pointer"
              onClick={() => mainImageRef.current?.click()}
            >
              <p className="px-1 bg-secondary opacity-80 text-white cursor-pointer float-right">
                Click to change image
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={mainImageRef}
              onChange={handleMainImageChange}
            />
          </>
        ) : (
          <p
            onClick={() => imageRef.current?.click()}
            className="cursor-pointer w-full h-full flex justify-center items-center"
          >
            Click to select product image
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
          ref={imageRef}
        />
      </div>
      <div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.slice(1).map((image, index) => (
            <div
              key={index}
              className="border border-dashed border-tertiary rounded size-20 md:size-[8rem] mx-2 my-2 text-center flex justify-center items-center relative"
            >
              <img
                src={
                  (searchParams.get("edit") && image.url) ||
                  URL.createObjectURL(image.File)
                }
                alt="product"
                className="w-full h-full object-contain"
              />
              <div
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                onClick={() => setImages(images.filter((img) => img !== image))}
              >
                <IoMdClose />
              </div>
            </div>
          ))}
        </div>
        <div className={images.length >= 7 ? "hidden" : "flex justify-end"}>
          <button
            className="py-1 px-2 bg-secondary rounded text-white"
            onClick={() => imageRef.current?.click()}
          >
            Add Another Image
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductImageSection;
