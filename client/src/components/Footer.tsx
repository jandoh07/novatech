import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="border-t-2 border-tertiary bg-secondary text-white py-5 mt-8">
      <div className="w-[95%] md:w-[80%] mx-auto md:flex flex-col md:flex-row items-center md:items-start justify-between gap-3">
        <div>
          <p className="text-3xl mb-7 md:mb-0">NovaTech</p>
        </div>
        <div className="inline-block md:block mr-10 mb-4 md:mr-0 md:mb-0">
          <p className="font-medium text-lg mb-2">Contact Us</p>
          <p>GZ-123-4567</p>
          <p>+233 123 456 789</p>
          <p>novatech@gmail.com</p>
        </div>
        <div className="inline-block md:block">
          <p className="font-medium text-lg mb-2">Quick Links</p>
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <Link to={""}>
            <p>Cart</p>
          </Link>
          <Link to={""}>
            <p>Wishlist</p>
          </Link>
        </div>
        <div>
          <p className="font-medium text-lg mb-2">
            Subscribe to our newsletter
          </p>
          <div className="border border-white rounded overflow-hidden max-w-max">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-white border-secondary text-secondary outline-none placeholder:text-secondary px-2 py-1"
            />
            <button className="bg-secondary text-white px-2 py-1">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
