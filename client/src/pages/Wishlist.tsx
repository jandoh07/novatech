import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const Wishlist = () => {
  return (
    <div className="flex flex-col justify-between min-h-[100svh]">
      <div>
        <Header />
        <div className="custom-container">
          <p className="text-lg font-medium">Products in wishlist</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
