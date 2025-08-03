import { useState } from "react";
import type { Product } from "../types/Products";
import instance from "../axios/axios";

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
    const response = await instance.get('/product')
    setProduct(response.data);
  };
  const handleEdit = (item: Product) => {
      console.log("Edit clicked for:", item);
      // You can open a modal or navigate to an edit form
    };
  
  const handleDelete = (item: Product) => {
    console.log("Delete clicked for:", item);
    // Show confirmation, then send DELETE request to backend
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const payload = extractData(products);

  //   try {
  //     const res = await instance.post('/service', payload);
  //     toast.success('Service created successfully!');
  //     console.log("Form Submitted:", res.data);
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message || 'Failed to create service');
  //     console.error("Error submitting form:", error);
  //   }
  // };
  return {
    headers,
    products,
    handleDelete,
    handleEdit,
    fetchProducts,
  };
};

export default useProduct;
