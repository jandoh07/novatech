import { FaCheck, FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { Spec } from "../../../types/Product";

const ProductSpecifcation = () => {
  const context = useContext(ProductContext);
  const { specs, setSpecs, toggleAddSpec, setToggleAddSpec } = context!;
  const [currentSpec, setCurrentSpec] = useState<Spec | null>(null);

  const handleNewSpec = () => {
    if (currentSpec) {
      setSpecs((prev) => [...prev, currentSpec]);
      setCurrentSpec(null);
      setToggleAddSpec(false);
    }
  };

  return (
    <div>
      <p className="mb-1">Product Specifications</p>
      {specs.map((spec, index) => (
        <div key={index} className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 w-full items-center mb-2">
            <p className="shrink-0 font-medium">{spec.key}:</p>
            {spec.edit ? (
              <input
                type="text"
                placeholder="Value"
                value={spec.value}
                className="border border-tertiary rounded p-1 w-full"
                onChange={(e) =>
                  setSpecs((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, value: e.target.value } : s
                    )
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    setSpecs((prev) =>
                      prev.map((s, i) =>
                        i === index ? { ...s, edit: false } : s
                      )
                    );
                }}
              />
            ) : (
              <p>{spec.value}</p>
            )}
          </div>
          <div className="flex gap-2 text-lg items-center">
            {spec.edit ? (
              <FaCheck
                className="text-green-500 cursor-pointer text-xl"
                onClick={() =>
                  setSpecs((prev) =>
                    prev.map((s, i) =>
                      i === index ? { ...s, edit: false } : s
                    )
                  )
                }
              />
            ) : (
              <FaEdit
                className=" text-xl cursor-pointer"
                onClick={() =>
                  setSpecs((prev) =>
                    prev.map((s, i) => (i === index ? { ...s, edit: true } : s))
                  )
                }
              />
            )}
            <MdDelete
              className="text-red-500 cursor-pointer text-xl"
              onClick={() =>
                setSpecs((prev) => prev.filter((_, i) => i !== index))
              }
            />
          </div>
        </div>
      ))}
      {toggleAddSpec ? (
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Key"
            className="w-1/2 border border-tertiary rounded p-1"
            onChange={(e) =>
              setCurrentSpec({
                key: e.target.value,
                value: currentSpec?.value ? currentSpec?.value : "",
                edit: false,
              })
            }
            onKeyDown={(e) => e.key === "Enter" && handleNewSpec()}
          />
          <input
            type="text"
            placeholder="Value"
            className="w-1/2 border border-tertiary rounded p-1"
            onChange={(e) =>
              setCurrentSpec((prev) => ({ ...prev!, value: e.target.value }))
            }
            onKeyDown={(e) => e.key === "Enter" && handleNewSpec()}
          />
          <FaCheck
            className="text-green-500 cursor-pointer text-xl"
            onClick={() => handleNewSpec()}
          />
          <IoMdClose
            onClick={() => {
              setToggleAddSpec(false);
              setCurrentSpec(null);
            }}
            className="text-2xl cursor-pointer"
          />
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setToggleAddSpec(true)}
            className="bg-secondary text-white py-1 px-2 rounded font-medium"
          >
            Add Specification
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductSpecifcation;
