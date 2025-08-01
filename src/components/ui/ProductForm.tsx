import { useEffect, useState } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder: string;
  value: string;
  options?: { label: string; value: string }[];
}

const ProductForm = () => {
  const [fields, setFields] = useState<Field[]>([
    {
      name: "product_name",
      label: "Product Name",
      type: "text",
      placeholder: "Enter Service name",
      value: "",
    },
    {
      name: "product_price",
      label: "Product Price",
      type: "text",
      placeholder: "Enter Service price",
      value: "",
    },
    {
      name: "product_description",
      label: "Product Description",
      type: "textarea",
      placeholder: "Enter Service description",
      value: "",
    },
    {
      name: "product_quantity",
      label: "Product Quantity",
      type: "text",
      placeholder: "Product Qty",
      value: "",
    },
    {
      name: "product_unit",
      label: "Product Unit",
      type: "select",
      placeholder: "Product Unit",
      value: "",
      options: [],
    },
    {
      name: "product_brand",
      label: "Product Brand",
      type: "text",
      placeholder: "Product Brand",
      value: "",
    },
    {
      name: "product_category",
      label: "Product Category",
      type: "select",
      placeholder: "Product Category",
      value: "",
      options: [],
    },
  ]);

  // Simulate backend fetch
  useEffect(() => {
    const fetchOptions = async () => {
      const units = [
        { label: "Piece", value: "piece" },
        { label: "Kilogram", value: "kg" },
        { label: "Liter", value: "ltr" },
      ];
      const categories = [
        { label: "Car Wash", value: "car_wash" },
        { label: "Detailing", value: "detailing" },
        { label: "Maintenance", value: "maintenance" },
      ];

      setFields((prev) =>
        prev.map((field) => {
          if (field.name === "product_unit") return { ...field, options: units };
          if (field.name === "product_category") return { ...field, options: categories };
          return field;
        })
      );
    };

    fetchOptions();
  }, []);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setFields((prev) => {
      const updated = [...prev];
      updated[index].value = value;
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as Record<string, string>);
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6  mx-auto bg-white rounded-2xl mt-5">
      {fields.map((field, index) => (
        <div key={field.name} className={field.name === "product_description" ? "md:col-span-2" : ""}>
          <label className="block mb-1 text-sm font-medium text-gray-700">{field.label}</label>

          {field.type === "textarea" ? (
            <textarea
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : field.type === "select" ? (
            <select
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{field.placeholder}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}

      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
