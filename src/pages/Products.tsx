import { useEffect } from "react";
import useProduct from "../hooks/useProduct";

import UserActions from "../components/layout/headers/UserActions";
import Table from "../components/ui/Table";
import Sidebar from "../components/layout/Sidebar";
import ProductForm from "../components/ui/ProductForm";

const Products = () => {
  const { products, headers, fetchProducts, handleEdit, handleDelete } =
    useProduct();
  useEffect(() => {
    fetchProducts();
  }, []);

  const data = products.map((item) => [
    item.productName,
    item.description,
    item.price,
    item.sku,
    item.category,
    item.brand,

    <div className="space-x-2">
      <button
        onClick={() => handleEdit(item)}
        className="text-blue-500 hover:underline"
      >
        Edit
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => handleDelete(item)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>,
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:block w-50 bg-white border-r shadow">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col w-full md:w-auto p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Products
          </h1>
          <UserActions />
        </div>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <Table headers={headers} data={data} />
        </div>
                 <div className="w-full p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Add New Product
          </h2>
          <ProductForm />
        </div>
      </div>
    </div>
  );
};

export default Products;
