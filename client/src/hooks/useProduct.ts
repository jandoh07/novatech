import React, { useState } from "react";
import { Product, Spec } from "../types/Product";
import { toast } from "react-toastify";
import { customAxios } from "../axios/axios";
import { useMutation } from "react-query";
import axios from "axios";

export interface ExtendedFile extends File {
  progress?: number;
}

const useProduct = () => {
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [images, setImages] = useState<ExtendedFile[]>([]);
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    brand: "",
    imageUrl: [],
    category: "",
    stock: 0,
  });
  const debounce = React.useRef<number | null>(null);
  const [progress, setProgress] = useState<string>("0");
  const [toggleAddSpec, setToggleAddSpec] = useState(false);
  const [discount, setDiscount] = useState<{ percentage: string | number; expiry: string | number }>({
    percentage: "",
    expiry: "",
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Phones & Tablets") {
      setSpecs([
        { key: "RAM", value: "", edit: true },
        { key: "Color", value: "", edit: true },
        { key: "Model", value: "", edit: true },
        { key: "Camera", value: "", edit: true },
        { key: "Storage", value: "", edit: true },
        { key: "Screen Size", value: "", edit: true },
        { key: "Battery Capacity", value: "", edit: true },
        { key: "Operating System", value: "", edit: true },
      ]);
    } else if (e.target.value === "") {
      setSpecs([]);
    } else if (e.target.value === "Accessories") {
      setSpecs([
        { key: "Size", value: "", edit: true },
        { key: "Color", value: "", edit: true },
        { key: "Weight", value: "", edit: true },
        { key: "Material", value: "", edit: true },
      ]);
    } else if (e.target.value === "Computers & Laptops") {
      setSpecs([
        { key: "RAM", value: "", edit: true },
        { key: "GPU", value: "", edit: true },
        { key: "Color", value: "", edit: true },
        { key: "Model", value: "", edit: true },
        { key: "Storage", value: "", edit: true },
        { key: "Processor", value: "", edit: true },
        { key: "Screen Size", value: "", edit: true },
        { key: "Battery Capacity", value: "", edit: true },
        { key: "Operating System", value: "", edit: true },
      ]);
    }

    setProduct((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };


  const getPreSignedUrl = async () => {
    const files = images.map(image => {
      const fileNameWithoutExtension = image.name.split('.').slice(0, -1).join('.');
      return { fileName: fileNameWithoutExtension, fileType: image.type };
    });
  
    const res = await customAxios.post("/s3", { files });
    return res.data;
  };


  const addProductMutation = useMutation(async () => {
    const preSignedUrls = await getPreSignedUrl();
    const imageUrls: string[] = [];
    const totalSize = images.reduce((acc, curr) => acc + curr.size, 0);
    let uploadedSize = 0;

    for (let i = 0; i < preSignedUrls.url.length; i++) {
      await axios
        .put(preSignedUrls.url[i].signedUrl, images[i]
          , {
          onUploadProgress: (progressEvent) => {
            const uploadedForThisFile = progressEvent.loaded;

            // Update total uploaded size
            uploadedSize += uploadedForThisFile - (images[i].progress || 0);
            images[i].progress = uploadedForThisFile;

            // Debounced progress update
            if (debounce.current) clearTimeout(debounce.current);
            debounce.current = setTimeout(() => {
              const overallProgress = Math.round(
                (uploadedSize / totalSize) * 100
              );
              setProgress(overallProgress + "%");
            }, 100);
          },
        }
      ).then(() => {
        imageUrls.push(preSignedUrls.url[i].signedUrl.split("?")[0]);
      })
  }

        const res = await customAxios.post("/products", {
      ...product,
      imageUrl: imageUrls,
      specs: specs
        .map((spec) => ({ key: spec.key, value: spec.value }))
        .filter((spec) => spec.value !== ""),
      ...(discount.percentage !== "" && discount.expiry !== "" && {
        discount: {
          percentage: discount.percentage,
          expiry: new Date(new Date().setDate(new Date().getDate() + Number(discount.expiry))),
        },
      }),
    });
    return res.data;
}, {
    onSuccess: () => {
      toast.success("Product added successfully");
      setProduct({
        name: "",
        price: 0,
        brand: "",
        imageUrl: [],
        category: "",
        stock: 0,
        description: "",
      });
      setImages([]);
      setSpecs([]);
      setProgress("0");
      setDiscount({
        percentage: "",
        expiry: "",
      });
    },
    onError: () => {
      toast.error("Failed to add product");
    },
  });

  return {
    product,
    setProduct,
    handleCategoryChange,
    specs,
    setSpecs,
    images,
    setImages,
    getPreSignedUrl,
    addProductMutation,
    progress,
    toggleAddSpec,
    setToggleAddSpec,
    discount,
    setDiscount,
  };
};

export default useProduct;
