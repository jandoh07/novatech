import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import AddNewProduct from "../components/Dashboard/AddNewProduct/AddNewProduct";
import EditProduct from "../components/Dashboard/EditProduct";
import useValidateUser from "../hooks/useValidateUser";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("addNewProduct");
  const { user, isAdmin } = useValidateUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user && !isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);
  return (
    <div className="min-h-[100svh] w-full">
      <Header />
      <div className="border border-tertiary rounded min-h-[600px] w-[95%] md:w-[80%] mx-auto my-5">
        <div className="flex justify-center items-center gap-3 bg-secondary p-2 text-white font-medium">
          <p
            className={
              activeTab === "addNewProduct" ? "text-tertiary" : "cursor-pointer"
            }
            onClick={() => setActiveTab("addNewProduct")}
          >
            Add New Product
          </p>
          <p>|</p>
          <p
            className={
              activeTab === "editProduct" ? "text-tertiary" : "cursor-pointer"
            }
            onClick={() => setActiveTab("editProduct")}
          >
            Edit Product
          </p>
        </div>
        {activeTab === "addNewProduct" ? <AddNewProduct /> : <EditProduct />}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
