import { useState, useEffect } from "react";
import instance from "../axios/axios"; // axios instance

const useBill = () => {
  const [fields, setFields] = useState([
    {
      name: "customer_name",
      label: "Customer Name",
      type: "text",
      placeholder: "Enter customer name",
      value: "",
    },
    {
      name: "vehicle_number",
      label: "Vehicle Number",
      type: "text",
      placeholder: "Enter vehicle number",
      value: "",
    },
    {
      name: "service_brand",
      label: "Vehicle Make and Model",
      type: "text",
      placeholder: "Enter vehicle model & brand",
      value: "",
    },
    {
      name: "number",
      label: "Number",
      type: "text",
      placeholder: "Enter Number",
      value: "",
    },

    // service details
    {
      name: "service_name",
      label: "Service Name",
      type: "select", // <-- make it a select field
      placeholder: "Select a service",
      value: "",
      options: [], // will be populated from backend
    },
    {
      name: "service_warranty",
      label: "Service Warranty",
      type: "text",
      placeholder: "Enter warranty in months",
      value: "",
    },
    {
      name: "worker_name",
      label: "Worker Name",
      type: "text",
      placeholder: "Enter worker name",
      value: "",
    },
    {
      name: "service_description",
      label: "Service Description",
      type: "text",
      placeholder: "Enter service details",
      value: "",
    },

    // price details
    {
      name: "service_amount",
      label: "Service amount",
      type: "text",
      placeholder: "Enter Service amount",
      value: "",
    },
    {
      name: "tax_amount",
      label: "Tax",
      type: "text",
      placeholder: "Enter Tax amount",
      value: "",
    },
    {
      name: "additional_charge",
      label: "Additional Charge",
      type: "text",
      placeholder: "Enter Additional charge",
      value: "",
    },
    {
      name: "additional_charge_for",
      label: "Additional Charge for",
      type: "text",
      placeholder: "Additional charge for :",
      value: "",
    },
    {
      name: "discount_amount",
      label: "Discount",
      type: "text",
      placeholder: "Enter Discount amount",
      value: "",
    },
    {
      name: "final_amount",
      label: "Final amount have to pay",
      type: "text",
      placeholder: "Final amount",
      value: "",
    },
  ]);

  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await instance.get("/services"); // adjust API path
        setServices(res.data);

        // update service_name field options
        setFields((prev) =>
          prev.map((f) =>
            f.name === "service_name"
              ? { ...f, options: res.data.map((s: any) => ({ label: s.name, value: s._id, price: s.basePrice })) }
              : f
          )
        );
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bill Data:", fields);
    // TODO: send to API
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const newFields = [...fields];
    const field = newFields[index];

    // If selecting a service, auto-fill price
    if (field.name === "serviceName") {
      const selectedService = field.options?.find((opt: any) => opt.value === event.target.value);
      if (selectedService) {
        field.value = selectedService.value;
        // update service amount field
        const serviceAmountIndex = newFields.findIndex((f) => f.name === "service_amount");
        if (serviceAmountIndex !== -1) {
          newFields[serviceAmountIndex].value = selectedService.price.toString();
        }
      }
    } else {
      field.value = event.target.value;
    }

    setFields(newFields);
  };

  return {
    fields,
    handleSubmit,
    handleInputChange,
  };
};

export default useBill;
