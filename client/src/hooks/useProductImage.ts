import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";


const useProductImage = () => {
    const context = useContext(ProductContext);
    const { images, setImages } = context!;
    const [searchParams] = useSearchParams();

    const compressImage = (selectedImages: File[]) => {
      if (selectedImages.length === 1 && selectedImages[0].size > 150 * 1024) {
        toast.info("Optimizing image...");
      } else if (selectedImages.length > 1) {
        toast.info("Optimizing images...");
      }
    
        selectedImages.forEach((image) => {
          if (image.size > 150 * 1024) {
            const compressedImage = imageCompression(image, {
              maxSizeMB: 0.15,
              maxWidthOrHeight: 500,
            });
    
            compressedImage
              .then((compressedImage) => {
                setImages((prevImages) => [...prevImages,{File: compressedImage}]);
              })
              .catch(() => {
                toast.error("An error occurred while compressing image");
              });
          } else {
            setImages((prevImages) => [...prevImages,{File: image}]);
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
              if (searchParams.get("edit")) {
                setImages((prevImages) => [{File: compressedImage, status: 'changed'}, ...prevImages.slice(1)]);
                return;
              }
              setImages((prevImages) => [{File: compressedImage}, ...prevImages.slice(1)]);
            })
            .catch(() => {
              toast.error("An error occurred while compressing image");
            });
        } else if (e.target.files) {
          const selectedImage = e.target.files[0];
          if (searchParams.get("edit")) {
            setImages((prevImages) => [{File: selectedImage, status: 'changed'}, ...prevImages.slice(1)]);
            return;
          }
          setImages((prevImages) => [{File: selectedImage}, ...prevImages.slice(1)]);
        }
      };

        return { handleImageChange, handleMainImageChange }
}

export default useProductImage