import { useEffect } from "react";
import UserActions from "../components/layout/headers/UserActions";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/ui/Table";

import useService from "../hooks/useServices";
import InputField from "../components/common/input/input";

const Services = () => {
  const {
    services,
    headers,
   fetchServices,
    handleEdit,
    handleDelete,
    fields,
    handleInputChange,
    handleSubmit
  } = useService();

  // Simulate API call
  useEffect(() => {
    fetchServices();
  }, []);

  // Convert backend data to table rows
  const data = services.map((item) => [
    item.serviceName,
    item.description,
    item.price,
    item.warranty,
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        item.status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {item.status}
    </span>,
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Services
          </h1>
          <UserActions />
        </div>

        {/* Table (responsive scroll for small screens) */}
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <Table headers={headers} data={data} />
        </div>
        <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Service Name and Description */}
            {fields.slice(0, 2).map((field, index) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(index, e)}
                className="col-span-2 w-full"
              />
            ))}

            {/* Service Description (Textarea) */}
            {fields.slice(2, 3).map((field, index) => (
              <div key={field.name} className="w-full">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {field.label}
                </label>
                <textarea
                  name={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={(e) => handleInputChange(index + 2, e)}
                  className="w-full p-2 bg-gray-50 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {fields.slice(3).map((field, index) => (
              <InputField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(index + 3, e)}
                className="w-full"
              />
            ))}
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-black hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Services;
