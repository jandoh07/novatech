import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import AddNewProduct from "../components/Dashboard/AddNewProduct/AddNewProduct";
import EditProduct from "../components/Dashboard/EditProduct/EditProduct";
import useValidateUser from "../hooks/useValidateUser";
import { useNavigate, useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const { user, isAdmin } = useValidateUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && !isAdmin) {
      navigate("/");
    }

    if (!tab) {
      setSearchParams({ tab: "addNewProduct" });
    }
  }, [user, isAdmin, navigate, setSearchParams, tab]);
  return (
    <div className="min-h-[100svh] w-full">
      <Header />
      <div className="border border-tertiary rounded min-h-[600px] custom-container my-5">
        <div className="flex justify-center items-center gap-3 bg-secondary p-2 text-white font-medium">
          <p
            className={
              tab === "addNewProduct" ? "text-tertiary" : "cursor-pointer"
            }
            onClick={() => setSearchParams({ tab: "addNewProduct" })}
          >
            Add New Product
          </p>
          <p>|</p>
          <p
            className={
              tab === "editProduct" ? "text-tertiary" : "cursor-pointer"
            }
            onClick={() => setSearchParams({ tab: "editProduct" })}
          >
            Edit Product
          </p>
        </div>
        {tab === "addNewProduct" ? <AddNewProduct /> : <EditProduct />}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
