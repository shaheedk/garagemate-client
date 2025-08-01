import { useState } from "react";
import type { Product } from "../types/Products";

const useProduct = () => {
  const headers = [
    "Product Name",
    "Description",
    "Price",
    "Sku",
    "Category",
    "Brand",
    "Actions",
  ];
  const [products, setProduct] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const response:Product[] = [
{
        productName: "Engine Oil 5W-30",
        description: "High-performance  petrol cars.",
        price: 1499 ,
        sku: "ENG-5W30-001",
        category: "Engine Oils",
        brand: "Castrol",
      },
      {
        productName: "Alloy Wheel Cleaner",
        description: "Removes brake dust and road grime from alloy wheels.",
        price: 899 ,
        sku: "AWC-ALX-202",
        category: "Cleaning",
        brand: "3M",
      },
      {
        productName: "Car Shampoo",
        description: "pH-neutral shampoo safe for all car paint types.",
        price: 499 ,
        sku: "CS-PH7-333",
        category: "Cleaning",
        brand: "Meguiar's",
      },
      {
        productName: "Windshield Washer Fluid",
        description: "Ready-to-use washer fluid for a clear windshield.",
        price: 199 ,
        sku: "WWF-BLUE-050",
        category: "Fluids",
        brand: "Bosch",
      },   {
        productName: "Windshield Washer Fluid",
        description: "Ready-to-use washer fluid for a clear windshield.",
        price: 199 ,
        sku: "WWF-BLUE-050",
        category: "Fluids",
        brand: "Bosch",
      },
    ];
    setProduct(response);
  };
  const handleEdit = (item: Product) => {
      console.log("Edit clicked for:", item);
      // You can open a modal or navigate to an edit form
    };
  
    const handleDelete = (item: Product) => {
      console.log("Delete clicked for:", item);
      // Show confirmation, then send DELETE request to backend
    };
  return {
    headers,
    products,
    handleDelete,
    handleEdit,
    fetchProducts,
  };
};

export default useProduct;
