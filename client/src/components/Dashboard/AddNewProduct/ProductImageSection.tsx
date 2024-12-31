import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { ProductContext } from "../../../context/ProductContext";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const ProductImageSection = () => {
  const context = useContext(ProductContext);
  const { images, setImages } = context!;
  const imageRef = React.useRef<HTMLInputElement>(null);
  const mainImageRef = React.useRef<HTMLInputElement>(null);

  const compressImage = (selectedImages: File[]) => {
    toast.info("Optimizing images...");

    selectedImages.forEach((image) => {
      if (image.size > 150 * 1024) {
        const compressedImage = imageCompression(image, {
          maxSizeMB: 0.15,
          maxWidthOrHeight: 500,
        });

        compressedImage
          .then((compressedImage) => {
            setImages((prevImages) => [...prevImages, compressedImage]);
          })
          .catch(() => {
            toast.error("An error occurred while compressing image");
          });
      } else {
        setImages((prevImages) => [...prevImages, image]);
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length + images.length <= 7) {
      const selectedImages = Array.from(e.target.files);

      if (selectedImages.length > 0) {
        compressImage(selectedImages);
      }
    } else {
      toast.error("You can only upload a maximum of 7 images");
      const selectedImages = e.target.files
        ? Array.from(e.target.files).slice(0, 7 - images.length)
        : [];

      if (selectedImages.length > 0) {
        compressImage(selectedImages);
      }
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].size > 150 * 1024) {
      toast.info("Optimizing image...");
      const selectedImage = e.target.files[0];
      imageCompression(selectedImage, {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 500,
      })
        .then((compressedImage) => {
          setImages((prevImages) => [compressedImage, ...prevImages.slice(1)]);
        })
        .catch(() => {
          toast.error("An error occurred while compressing image");
        });
    } else if (e.target.files) {
      const selectedImage = e.target.files[0];
      setImages((prevImages) => [selectedImage, ...prevImages.slice(1)]);
    }
  };

  return (
    <>
      <div className="border border-dashed border-tertiary rounded md:w-[20rem] h-[15rem] mx-auto text-center flex justify-center items-center relative">
        {images.length > 0 ? (
          <>
            <img
              src={URL.createObjectURL(images[0])}
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
                src={URL.createObjectURL(image)}
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
