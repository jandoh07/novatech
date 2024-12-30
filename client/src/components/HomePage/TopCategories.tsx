const categories = [
  {
    name: "Phones & Tablets",
    image: "/phones&tablets.jpg",
  },
  {
    name: "Laptops & Computers",
    image: "/laptops&computers.jpg",
  },
  {
    name: "Accessories",
    image: "/accessories.jpg",
  },
  {
    name: "Gaming",
    image: "/gaming.jpg",
  },
];

const TopCategories = () => {
  return (
    <div className="w-[95%] md:w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold my-4">Top Categories</h1>
      <div className="flex items-center gap-4 overflow-x-scroll no-scrollbar">
        {categories.map((category) => (
          <div
            className="relative w-[14rem] md:w-[20rem] shrink-0 overflow-hidden rounded-lg"
            key={category.name}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[9rem] md:h-[13rem] object-cover"
            />
            <div className="font-semibold absolute top-0 left-0 bg-secondary p-1 pr-4 text-white bg-opacity-65">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
