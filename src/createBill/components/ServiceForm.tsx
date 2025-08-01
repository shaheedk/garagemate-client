import React from "react";
import useBill from "../../hooks/useBill";

const ServiceDetailsForm = () => {
  const { serviceDtl, setServiceDtl } = useBill();

  const handleServiceInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updated = [...serviceDtl];
    updated[index].value = event.target.value;
    setServiceDtl(updated);
  };

  return (
    <div className="flex flex-col px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Service details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviceDtl.map((field, index) => (
          <div
            key={field.name}
            className={`flex flex-col ${
              field.name === "service_description" ? "md:col-span-1" : ""
            }`}
          >
            <label className="text-sm font-medium mb-1">{field.label}</label>
            {field.name === "service_description" ? (
              <textarea
                name={field.name}
                value={field.value}
                placeholder="Enter Service description & Product details"
                onChange={(e) => handleServiceInputChange(index, e)}
                rows={4}
                className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => handleServiceInputChange(index, e)}
                className="p-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailsForm;
