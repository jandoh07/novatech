import { useQuery } from "react-query";
import { customAxios } from "../../axios/axios";

const EditProduct = () => {
  const query = useQuery("products", async () => {
    const res = await customAxios.get("/products");
    return res.data;
  });
  return <div>EditProduct</div>;
};

export default EditProduct;
