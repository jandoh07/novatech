import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterContext } from "../context/FilterContext";
import { useQuery } from "react-query";
import { customAxios } from "../axios/axios";
import { Product } from "../types/Product";

const useSearchResults = () => {
    const [searchParams] = useSearchParams();
      const searchTerm = searchParams.get("query");
    const [brands, setBrands] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[] | null>(null);
    const filterContext = useContext(FilterContext);
    const { selectedItems, setSelectedItems } = filterContext!;
    const brand = new Set<string>();
    const category = new Set<string>();
  
    const searchTermQuery = useQuery(
      ["search", searchTerm],
      async () => {
        const res = await customAxios.get(`/search/${searchTerm}`);
  
        res.data.map((product: Product) => {
          brand.add(product.brand);
          category.add(product.category);
        });
  
        setBrands(Array.from(brand));
        setCategories(Array.from(category));
        setProducts(res.data);
        setSelectedItems({
          brand: [],
          category: [],
          rating: [],
          price: [],
        });
  
        return res.data;
      },
      {
        enabled: searchTerm !== "",
      }
    );
  
    const filterQuery = useQuery(["search", selectedItems], async () => {
      const queryParam = searchParams.get("query");
      const brandParam =
        selectedItems.brand.length > 0
          ? selectedItems.brand.join(",")
          : undefined;
      const categoryParam =
        selectedItems.category.length > 0
          ? selectedItems.category.join(",")
          : undefined;
      const ratingParam =
        selectedItems.rating.length > 0
          ? Math.min(...selectedItems.rating.map(Number))
          : undefined;
      const priceParam =
        selectedItems.price.length > 0
          ? selectedItems.price.join(",")
          : undefined;
  
      const params = new URLSearchParams();
      if (brandParam) params.append("brand", brandParam);
      if (categoryParam) params.append("category", categoryParam);
      if (ratingParam !== undefined)
        params.append("rating", ratingParam.toString());
      if (priceParam) params.append("price", priceParam);
  
      const res = await customAxios.get(
        `/search/${queryParam}?${params.toString()}`
      );
  
      setProducts(res.data);
      return res.data;
    });

    return { searchTermQuery, filterQuery, searchTerm, brands, categories, products, setSelectedItems };
}

export default useSearchResults